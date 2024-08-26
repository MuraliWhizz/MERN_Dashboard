// color design tokens export
export const tokensDark = {
  grey: {
    0: "#ffffff",
    10: "#f6f6f6",
    50: "#f0f0f0",
    100: "#e0e0e0",
    200: "#c2c2c2",
    300: "#a3a3a3",
    400: "#858585",
    500: "#666666",
    600: "#525252",
    700: "#3d3d3d",
    800: "#292929",
    900: "#141414",
    1000: "#000000",
  },
  primary: {
    // blue
    100: "#d0d1d5",
    200: "#a1a4ab",
    300: "#727681",
    400: "#1F2A40",
    500: "#141b2d",
    600: "#101624",
    700: "#0c101b",
    800: "#080b12",
    900: "#040509",
  },
  secondary: {
    50: "#f0f0f0",
    100: "#f8dcdb",
    200: "#f1b9b7",
    300: "#e99592",
    400: "#e2726e",
    500: "#db4f4a",
    600: "#af3f3b",
    700: "#832f2c",
    800: "#58201e",
    900: "#2c100f",
  },
};

// function that reverses the color palette
function reverseTokens(tokensDark) {
  const reversedTokens = {};
  Object.entries(tokensDark).forEach(([key, val]) => {
    const keys = Object.keys(val);
    const values = Object.values(val);
    const length = keys.length;
    const reversedObj = {};
    for (let i = 0; i < length; i++) {
      reversedObj[keys[i]] = values[length - i - 1];
    }
    reversedTokens[key] = reversedObj;
  });
  return reversedTokens;
}
export const tokensLight = reverseTokens(tokensDark);

// mui theme settings
export const themeSettings = (mode) => {
  return {
    palette: {
      mode: mode,
      ...(mode === "dark"
        ? {
            // palette values for dark mode
            primary: {
              ...tokensDark.primary,
              main: tokensDark.primary[400],
              light: tokensDark.primary[500],
            },
            secondary: {
              ...tokensDark.secondary,
              main: tokensDark.secondary[300],
              light: tokensDark.secondary[200],
            },
            neutral: {
              ...tokensDark.grey,
              main: tokensDark.grey[500],
            },
            background: {
              default: tokensDark.primary[600],
              alt: tokensDark.primary[500],
            },
          }
        : {
            // palette values for light mode
            primary: {
              ...tokensLight.primary,
              main: tokensDark.grey[50],
              light: tokensDark.grey[100],
            },
            secondary: {
              ...tokensLight.secondary,
              main: tokensDark.secondary[600],
              light: tokensDark.secondary[700],
            },
            neutral: {
              ...tokensLight.grey,
              main: tokensDark.grey[500],
            },
            background: {
              default: tokensDark.grey[0],
              alt: tokensDark.grey[100],
            },
          }),
    },
    typography: {
      fontFamily: ["Inter", "sans-serif"].join(","),
      fontSize: 12,
      h1: {
        fontFamily: ["Inter", "sans-serif"].join(","),
        fontSize: 40,
      },
      h2: {
        fontFamily: ["Inter", "sans-serif"].join(","),
        fontSize: 32,
      },
      h3: {
        fontFamily: ["Inter", "sans-serif"].join(","),
        fontSize: 24,
      },
      h4: {
        fontFamily: ["Inter", "sans-serif"].join(","),
        fontSize: 20,
      },
      h5: {
        fontFamily: ["Inter", "sans-serif"].join(","),
        fontSize: 16,
      },
      h6: {
        fontFamily: ["Inter", "sans-serif"].join(","),
        fontSize: 14,
      },
    },
  };
};


// // color design tokens export
// export const tokensDark = {
//   grey: {
//     0: "#ffffff",
//     10: "#f8f9fa",
//     50: "#f0f4f8",
//     100: "#d9e2ec",
//     200: "#bcccdc",
//     300: "#9fb3c8",
//     400: "#829ab1",
//     500: "#627d98",
//     600: "#486581",
//     700: "#334e68",
//     800: "#243b53",
//     900: "#102a43",
//     1000: "#000000",
//   },
//   primary: {
//     // blue
//     100: "#e3f2fd",
//     200: "#bbdefb",
//     300: "#90caf9",
//     400: "#64b5f6",
//     500: "#42a5f5",
//     600: "#2196f3",
//     700: "#1e88e5",
//     800: "#1976d2",
//     900: "#1565c0",
//   },
//   secondary: {
//     50: "#e8f5fe",
//     100: "#b3e0ff",
//     200: "#80ccff",
//     300: "#4db8ff",
//     400: "#26a8ff",
//     500: "#0099ff",
//     600: "#007acc",
//     700: "#005c99",
//     800: "#003d66",
//     900: "#001f33",
//   },
// };

// // function that reverses the color palette
// function reverseTokens(tokensDark) {
//   const reversedTokens = {};
//   Object.entries(tokensDark).forEach(([key, val]) => {
//     const keys = Object.keys(val);
//     const values = Object.values(val);
//     const length = keys.length;
//     const reversedObj = {};
//     for (let i = 0; i < length; i++) {
//       reversedObj[keys[i]] = values[length - i - 1];
//     }
//     reversedTokens[key] = reversedObj;
//   });
//   return reversedTokens;
// }
// export const tokensLight = reverseTokens(tokensDark);

// // mui theme settings
// export const themeSettings = (mode) => {
//   return {
//     palette: {
//       mode: mode,
//       ...(mode === "dark"
//         ? {
//             // palette values for dark mode
//             primary: {
//               ...tokensDark.primary,
//               main: tokensDark.primary[400],
//               light: tokensDark.primary[300],
//             },
//             secondary: {
//               ...tokensDark.secondary,
//               main: tokensDark.secondary[300],
//               light: tokensDark.secondary[200],
//             },
//             neutral: {
//               ...tokensDark.grey,
//               main: tokensDark.grey[500],
//             },
//             background: {
//               default: tokensDark.grey[900],
//               alt: tokensDark.grey[800],
//             },
//           }
//         : {
//             // palette values for light mode
//             primary: {
//               ...tokensLight.primary,
//               main: tokensDark.primary[600],
//               light: tokensDark.primary[400],
//             },
//             secondary: {
//               ...tokensLight.secondary,
//               main: tokensDark.secondary[500],
//               light: tokensDark.secondary[300],
//             },
//             neutral: {
//               ...tokensLight.grey,
//               main: tokensDark.grey[500],
//             },
//             background: {
//               default: tokensDark.grey[0],
//               alt: tokensDark.grey[50],
//             },
//           }),
//     },
//     typography: {
//       fontFamily: ["Roboto", "sans-serif"].join(","),
//       fontSize: 14,
//       h1: {
//         fontFamily: ["Roboto", "sans-serif"].join(","),
//         fontSize: 40,
//         fontWeight: 500,
//       },
//       h2: {
//         fontFamily: ["Roboto", "sans-serif"].join(","),
//         fontSize: 32,
//         fontWeight: 500,
//       },
//       h3: {
//         fontFamily: ["Roboto", "sans-serif"].join(","),
//         fontSize: 24,
//         fontWeight: 500,
//       },
//       h4: {
//         fontFamily: ["Roboto", "sans-serif"].join(","),
//         fontSize: 20,
//         fontWeight: 500,
//       },
//       h5: {
//         fontFamily: ["Roboto", "sans-serif"].join(","),
//         fontSize: 16,
//         fontWeight: 500,
//       },
//       h6: {
//         fontFamily: ["Roboto", "sans-serif"].join(","),
//         fontSize: 14,
//         fontWeight: 500,
//       },
//     },
//   };
// };





// // color design tokens export
// export const tokensDark = {
//   grey: {
//     0: "#ffffff",
//     10: "#f6f7f9",
//     50: "#e9ecf1",
//     100: "#d4dae1",
//     200: "#b9c2cc",
//     300: "#9ea9b7",
//     400: "#8391a2",
//     500: "#69798e",
//     600: "#556275",
//     700: "#414b5c",
//     800: "#2d3643",
//     900: "#1a202a",
//     1000: "#0b0e11",
//   },
//   primary: {
//     // deep blue
//     100: "#e1e8f0",
//     200: "#c3d1e1",
//     300: "#a5bad2",
//     400: "#87a3c3",
//     500: "#698cb4",
//     600: "#4b75a5",
//     700: "#3d5e84",
//     800: "#2e4763",
//     900: "#1f3042",
//   },
//   secondary: {
//     // teal
//     50: "#e7f5f5",
//     100: "#c3e5e5",
//     200: "#9fd5d5",
//     300: "#7bc5c5",
//     400: "#57b5b5",
//     500: "#33a5a5",
//     600: "#298484",
//     700: "#1f6363",
//     800: "#154242",
//     900: "#0a2121",
//   },
//   accent: {
//     // amber
//     50: "#fff8e1",
//     100: "#ffecb3",
//     200: "#ffe082",
//     300: "#ffd54f",
//     400: "#ffca28",
//     500: "#ffc107",
//     600: "#ffb300",
//     700: "#ffa000",
//     800: "#ff8f00",
//     900: "#ff6f00",
//   },
// };

// // function that reverses the color palette
// function reverseTokens(tokensDark) {
//   const reversedTokens = {};
//   Object.entries(tokensDark).forEach(([key, val]) => {
//     const keys = Object.keys(val);
//     const values = Object.values(val);
//     const length = keys.length;
//     const reversedObj = {};
//     for (let i = 0; i < length; i++) {
//       reversedObj[keys[i]] = values[length - i - 1];
//     }
//     reversedTokens[key] = reversedObj;
//   });
//   return reversedTokens;
// }
// export const tokensLight = reverseTokens(tokensDark);

// // mui theme settings
// export const themeSettings = (mode) => {
//   return {
//     palette: {
//       mode: mode,
//       ...(mode === "dark"
//         ? {
//             primary: {
//               ...tokensDark.primary,
//               main: tokensDark.primary[500],
//               light: tokensDark.primary[300],
//             },
//             secondary: {
//               ...tokensDark.secondary,
//               main: tokensDark.secondary[500],
//               light: tokensDark.secondary[300],
//             },
//             neutral: {
//               ...tokensDark.grey,
//               main: tokensDark.grey[500],
//             },
//             background: {
//               default: tokensDark.grey[900],
//               alt: tokensDark.grey[800],
//             },
//             accent: {
//               ...tokensDark.accent,
//               main: tokensDark.accent[500],
//             },
//           }
//         : {
//             primary: {
//               ...tokensLight.primary,
//               main: tokensDark.primary[600],
//               light: tokensDark.primary[400],
//             },
//             secondary: {
//               ...tokensLight.secondary,
//               main: tokensDark.secondary[600],
//               light: tokensDark.secondary[400],
//             },
//             neutral: {
//               ...tokensLight.grey,
//               main: tokensDark.grey[500],
//             },
//             background: {
//               default: tokensDark.grey[10],
//               alt: tokensDark.grey[0],
//             },
//             accent: {
//               ...tokensLight.accent,
//               main: tokensDark.accent[500],
//             },
//           }),
//     },
//     typography: {
//       fontFamily: ["Inter", "sans-serif"].join(","),
//       fontSize: 14,
//       fontWeightLight: 300,
//       fontWeightRegular: 400,
//       fontWeightMedium: 500,
//       fontWeightBold: 700,
//       h1: {
//         fontFamily: ["Inter", "sans-serif"].join(","),
//         fontSize: 40,
//         fontWeight: 700,
//         lineHeight: 1.2,
//       },
//       h2: {
//         fontFamily: ["Inter", "sans-serif"].join(","),
//         fontSize: 32,
//         fontWeight: 700,
//         lineHeight: 1.2,
//       },
//       h3: {
//         fontFamily: ["Inter", "sans-serif"].join(","),
//         fontSize: 24,
//         fontWeight: 700,
//         lineHeight: 1.3,
//       },
//       h4: {
//         fontFamily: ["Inter", "sans-serif"].join(","),
//         fontSize: 20,
//         fontWeight: 600,
//         lineHeight: 1.4,
//       },
//       h5: {
//         fontFamily: ["Inter", "sans-serif"].join(","),
//         fontSize: 16,
//         fontWeight: 600,
//         lineHeight: 1.5,
//       },
//       h6: {
//         fontFamily: ["Inter", "sans-serif"].join(","),
//         fontSize: 14,
//         fontWeight: 600,
//         lineHeight: 1.6,
//       },
//       body1: {
//         fontSize: 14,
//         lineHeight: 1.5,
//       },
//       button: {
//         fontWeight: 600,
//         textTransform: "none",
//       },
//     },
//     components: {
//       MuiButton: {
//         styleOverrides: {
//           root: {
//             borderRadius: 8,
//             textTransform: "none",
//             fontWeight: 600,
//           },
//         },
//       },
//       MuiCard: {
//         styleOverrides: {
//           root: {
//             borderRadius: 12,
//             boxShadow: mode === "dark" 
//               ? "0 4px 6px rgba(0, 0, 0, 0.2)" 
//               : "0 4px 6px rgba(0, 0, 0, 0.1)",
//           },
//         },
//       },
//     },
//   };
// };



