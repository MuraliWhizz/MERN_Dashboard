import React, { useMemo, useState } from 'react';
import { ResponsiveChoropleth } from '@nivo/geo';
import { geoData } from '@/utils/geoData';
import { useGetEnergyInsightsQuery } from '@/state/api';

const regionToCountryCode = {
    "Northern America": ["USA", "CAN", "MEX"],
    "Central America": ["BLZ", "CRI", "SLV", "GTM", "HND", "NIC", "PAN"],
    "Canada": ["AB", "BC", "MB", "NB", "NL", "NS", "NT", "NU", "ON", "PE", "QC", "SK", "YT"],
    "Mexico": ["AGU", "BCN", "BCS", "CAM", "CHP", "CHH", "COA", "COL", "CDMX", "DUR", "GUA", "GRO", "HID", "JAL", "MEX", "MIC", "MOR", "NAY", "NLE", "OAX", "PUE", "QUE", "ROO", "SLP", "SIN", "SON", "TAB", "TAM", "TLA", "VER", "YUC", "ZAC"],
    "Brazil": ["AC", "AL", "AP", "AM", "BA", "CE", "DF", "ES", "GO", "MA", "MT", "MS", "MG", "PA", "PB", "PR", "PE", "PI", "RJ", "RN", "RS", "RO", "RR", "SC", "SP", "SE", "TO"],
    "India": ["AP", "AR", "AS", "BR", "CT", "GA", "GJ", "HR", "HP", "JH", "KA", "KL", "MP", "MH", "MN", "ML", "MZ", "NL", "OR", "PB", "RJ", "SK", "TN", "TG", "TR", "UP", "UT", "WB"]
};

const RegionalFocus = () => {
  const [mode, setMode] = useState('light');
  const { data: energyData, isLoading } = useGetEnergyInsightsQuery({ page: 1, pageSize: 1000 });

  const mergedData = useMemo(() => {
    if (!energyData) return [];
    
    const dataMap = {};
    energyData.forEach(item => {
      const countryCodes = regionToCountryCode[item.region] || [];
      countryCodes.forEach(code => {
        if (!dataMap[code] || dataMap[code].value < item.intensity) {
          dataMap[code] = { id: code, value: item.intensity };
        }
      });
    });
    
    return Object.values(dataMap);
  }, [energyData]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const theme = {
    background: mode === 'dark' ? '#333' : '#f0f0f0',
    text: mode === 'dark' ? '#fff' : '#000',
    borderColor: mode === 'dark' ? '#666' : '#ccc'
  };

  return (
    <div style={{ height: '715px', padding: '20px', backgroundColor: theme.background }}>
      <h2 style={{ fontSize: '24px', marginBottom: '10px', color: theme.text }}>
        Regional Focus
      </h2>
      <ResponsiveChoropleth
        data={mergedData}
        features={geoData.features}
        margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
        colors={mode === 'dark' ? "blues" : "reds"}
        domain={[0, Math.max(...mergedData.map(d => d.value), 1)]}
        unknownColor="#666666"
        label="properties.name"
        valueFormat=".2s"
        projectionType="equirectangular"
        projectionScale={120}
        projectionTranslation={[0.5, 0.5]}
        projectionRotation={[0, 0, 0]}
        enableGraticule={true}
        graticuleLineColor={theme.borderColor}
        borderWidth={0.5}
        borderColor={theme.borderColor}
        legends={[
          {
            anchor: 'bottom-left',
            direction: 'column',
            justify: true,
            translateX: 20,
            translateY: -40,
            itemsSpacing: 0,
            itemWidth: 94,
            itemHeight: 18,
            itemDirection: 'left-to-right',
            itemTextColor: theme.text,
            itemOpacity: 0.85,
            symbolSize: 18,
            effects: [
              {
                on: 'hover',
                style: {
                  itemTextColor: mode === 'dark' ? '#fff' : '#000',
                  itemOpacity: 1
                }
              }
            ]
          }
        ]}
        tooltip={({ feature, value }) => (
          <div
            style={{
              backgroundColor: mode === 'dark' ? '#333' : '#fff',
              padding: '10px',
              border: `2px solid ${theme.borderColor}`,
              color: theme.text
            }}
          >
            <strong>{feature.properties.name}</strong>
            <br />
            Intensity: {value !== undefined ? value.toFixed(2) : 'No data'}
          </div>
        )}
      />
    </div>
  );
};

export default RegionalFocus;