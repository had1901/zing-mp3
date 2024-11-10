/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme')
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    screens: {
      'xs': '378px',
      ...defaultTheme.screens,
    },
    extend: {
      fontSize: {
        sss: '0.25rem',
        ss: '0.55rem',
        '2rem': '2rem',
        '40px': '2.5rem',
      },
      flex: {
        '2': '2 2 0%',
        '3': '3 3 0%',
        '4': '4 4 0$',
      },
      borderWidth: {
        '1': '1px',
      },
      padding: {
        '20': '20px',
        '30': '30px',
      },
      width: {
        '4px': '4px',
        '9px': '9px',
        '12px': '12px',
        '10px': '10px',
        '22px': '22px',
        '60px': '60px',
        '28px': '28px',
        '125px': '125px',
        '1/6': '16.66667%',
        '32': '32%',
        '33': '33.333337%',
        '95': '95%',
        '120': '120px',
        '200': '200px',
        '240': '240px',
        '320': '320px',
        '440': '440px',
        '500': '500px',
        '1/44': '14.28571%',
      },
      height: {
        '1-3': '3px',
        '4px': '4px',
        '1-4': '5px',
        '1-5': "6px",       
        '12px': "12px",       
        '16px': '16px',
        '22px': '22px',
        '90': '90.2%',
        '70': '70px',
        '91': '90px',
        '84': '84px',
        '15': '10%',
        '120': '120px',
        '150': '150px',
        '200': '200px',
        '3000': '3000px',

      },
      minHeight: {
        '40': '40px',
        '32': '32px',
      },
      minWidth: {
        '40': '40px',
        '32': '32px',
        '107': '107px',
        '190': '190px',
        '235': '235px',
      },
      maxWidth: {
        '190': '190px',
        '200px': '200px',
        '235': '235px',
        '1/44': '14.28571%',
      },
      maxHeight: {
        '200px': '200px',
      },
      spacing: {
        '5rem': '5rem',
        '2%9': '2.9%',
        '3%3': '3.3%',
        '68': '68%',
        '99': '99%',
        '60%': '60%',
        '120%': '120%',
        '94%': '94%',
      },
      inset: {
        '94%': '94%',
        '15%': '15%',
      },
      gap: {
        '30px': '1,875',
      },
      backgroundImage: {
        
      },
      colors: {
        primary: '#170f23',
        inp: '#2f2739',
        inputs: '#d3d3d3',
        navBar: '#130c1c',
        main: '#231b2e',
        violet: '#9b4de0',
        colo: '#DADADA',
        active: '#3a3344b3',
        silver: '#a6a6a6',
        colorPopup: '#34224f',
  
        before: '3px',
        shadowPopup: '0 0 5px 0 rgba(0,0,0,.2)',
        bgOpacity: 'rgba(156, 156, 156, 0.3)',
        musicBgColor: 'rgba(0,0,0, 0.5)',
        smSidebarScreen: 'rgb(41 17 62)',

        blueRose: '#1a3570',
        bluePrimaryRose: '#1A3570',
        searchBarRose: '#061d4f',
        sidebarRose: 'hsla(0,0%,100%,0.05)',
        searchRose: 'hsla(0,0%,100%,0.1)',
        textRose: '#4C7CFF',
        controlAudioRose: '#061641',
        lineActiveRose: '#3560F5',

        sidebarJennie: 'rgba(0,0,0,0.05)',
        searchBarJennie: '#bbb9c4',
        textActiveJennie: '#2a5e6b',
        textJennie: '#32323d',
        textSecondJennie: '#696969',
        textPlaceHolderJennie: '#757575',
        settingIcon: '#495057',
        popupJennie: '#CAC6DD', 
        controlAudioJennie: '#c6c4d1',
        lineActiveJennie: '#8919AE',

        lineActiveJisoo: '#8D22C3',

        sidebarLisa: 'hsla(0,0%,100%,0.3)',
        searchBarLisa: '#f2ddd8',
        popupLisa: '#F9E6E2',
        textLisa: '#CC3373',
        controlAudioLisa: '#f4cbca',
        lineActiveLisa: '#D14781',
        modelLisa: '#e1beb6',
        popupUI: '#EFEDEB',
        searchBarIU: '#e6e1de',
        controlAudioIU: '#f5e6e0',
        
        textEiffel: '#a0a0a0',
        searchBarEiffel: '#282828',
        popupEiffel: '#363636',
        controlAudioEiffel: '#181818',

        textZingchart: 'hsla(0,0%,100%,0.5)',

        primaryAdmin: '#f5f5f5',
        bgAdmin: '#f4f5f7',
      },
      boxShadow: {
        musicShadow: '0px 0px 7px 3px inset',
        sidebarShadow: '2px 0px 54px 2px rgb(32 32 32 / 24%)',
        account: '0 0 5px 0 rgba(0, 0, 0, .2)',
        navbar: '0 3px 5px rgb(0 0 0 / 10%)'
      },
      animation: {
        'spin-rotate': 'spinn 4s infinite linear ',
        'm1-animate': 'm1 2s infinite ease-in ',
        'm2-animate': 'm2 2.5s infinite ease-in-out',
        'm3-animate': 'm3 3s infinite linear ',
        'm4-animate': 'm4 3.5s infinite ease-in ',
        'm5-animate': 'm5 2.2s infinite ease-in ',
        'm6-animate': 'm6 1.8s infinite ease-in-out ',
      },
      
    },
    
  },
  plugins: [
    {
      autoprefixer: {},
    }
  ],
  
}