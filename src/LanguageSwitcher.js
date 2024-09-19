// src/LanguageSwitcher.js
import React from 'react';
// import { useTranslation } from 'react-i18next';

// const LanguageSwitcher = () => {
//   const { i18n } = useTranslation();

//   const changeLanguage = (lng) => {
//     i18n.changeLanguage(lng);
//   };

//   return (
//     <div>
//       {/* <button onClick={() => changeLanguage('en')}>English</button>
//       <button onClick={() => changeLanguage('ta')}>தமிழ்</button> */}

// <select onChange={(e) => ChangeLanguage(lng)}>
//                     <option value="en">English</option>
//                     <option value="ta">Tamil</option>
//                 </select>
//     </div>
//   );
// };

// export default LanguageSwitcher;

import { useTranslation } from 'react-i18next';

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  return (
    <div style={{ position: 'absolute', top: '10px', right: '10px' }}>
      <select onChange={(e) => changeLanguage(e.target.value)}>
        <option value="en">English</option>
        <option value="ta">தமிழ்</option>
      </select>
    </div>
  );
};

export default LanguageSwitcher;
