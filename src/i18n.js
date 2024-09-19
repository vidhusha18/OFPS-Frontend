import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: {
          welcome: "Welcome",
          switchLanguage: "Switch to Tamil",
          submitComplaint: "Submit Complaint",
          incidentType: "Incident Type",
          IncidentDate: "Incident Date",
          IncidentPlace: "Incident Place",
          IncidentDistrict: "Incident District",
          IncidentProof: "Incident Proof",
          SuspectType: "Suspect Type",
          IncidentDescription: "Incident Description",
          SubmitComplaint: "Submit Complaint",
          selectDistrict: "Select District",
          name: "Name ",
          dob: "Date of Birth",
          idType: "Identification Type",
          idnum: "ID Number",
          Address: "Address ",
          Gender: "Gender",
          phn: "Phone Number",
          compDetails: "Complaint Details",
          sincitype: "Select Incident Type",
          pic: "upload Photo",
          email: "Email",
          Password: "Password",
          cPass: "Confirm password",
          relType: "Relation Type",
          relName: "Relative Name",
          sustype:"Select Suspect Type",
          term1: " Though the Online FIR Process is done in this application, the complainant must connect with a police officer or be present at the police station whenever called. Even though the FIR can be filed online, any evidence collected throughout the various stages of FIR process will be disclosed in person except the final F.I.R Closure",
          term2: "I accept the",
          term3: "Terms and Conditions",
          reg: "Register",
          imp: " Before proceeding with the registration, please make sure to review the following important points:",
          pt1: "👉 Ensure you have a valid email address as it will be used for communication.",
          pt2: "👉 Upload a clear and recent photograph for identification purposes.",
          pt3: "👉 All fields marked with * are Mandatory and need to be filled accurately.",
          pt4: "👉 For any queries regarding the FIR processing system, refer to our official website or contact support.",
          pt5: "👉 Make sure to read and understand the Terms and Conditions before completing the registration.",
          pt6: "⚠️ False complaints are subject to prosecution under IPC.",
          pt7: "👉 The Online FIR Processing System (OFPS) is available for registering complaints online.",
          ptr: " POINTS TO REMEMBER"
        }
      },
      ta: {
        translation: {
          submitComplaint: "வணக்கம்",
          switchLanguage: "ஆங்கிலத்திற்கு மாறவும்",
          incidentType: "நடந்த சம்பவத்தின் வகை",
          IncidentPlace: "சம்பவம் நடந்த இடம்",
          IncidentDate: "சம்பவம் நடந்த தேதி",
          IncidentDistrict: "சம்பவம் நடந்த மாவட்டம்",
          IncidentProof: "சம்பவ ஆதாரம்",
          SuspectType: "சந்தேக நபர் வகை ",
          IncidentDescription: "சம்பவம் பற்றிய விளக்கம்",
          SubmitComplaint: "புகாரைச் சமர்ப்பிக்கவும்",
          selectDistrict: "மாவட்டத்தை தேர்ந்தெடுக்கவும்",
          name: "பெயர்",
          dob: "பிறந்த தேதி",
          idType: "அடையாள வகை",
          idnum: "அடையாள எண்",
          Address: "முகவரி",
          Gender: "பாலினம்",
          phn: "தொலைபேசி எண்",
          compDetails: "புகார் விவரங்கள்",
          sincitype: "சம்பவ வகையைத் தேர்ந்தெடுக்கவும்",
          pic: "புகைப்படத்தை பதிவேற்றவும்",
          email: "மின்னஞ்சல்",
          Password: "கடவுச்சொல்",
          cPass: "கடவுச்சொல்லை உறுதிப்படுத்தவும",
          rType: "உறவு வகை",
          relName: "உறவினரின் பெயர்",
          term1: "இந்த விண்ணப்பத்தில் ஆன்லைன் எஃப்ஐஆர் செயல்முறை செய்யப்பட்டாலும், புகார்தாரர் ஒரு போலீஸ் அதிகாரியுடன் தொடர்பு கொள்ள வேண்டும் அல்லது எப்போது அழைத்தாலும் காவல் நிலையத்தில் இருக்க வேண்டும்.எஃப்.ஐ.ஆர் ஆன்லைனில் பதிவு செய்யப்படலாம் என்றாலும், எஃப்.ஐ.ஆர் செயல்முறையின் பல்வேறு கட்டங்களில் சேகரிக்கப்பட்ட எந்த ஆதாரமும் இறுதி எஃப்.ஐ.ஆர் மூடல் தவிர நேரில் வெளியிடப்படும்.",
          term2: "நான்  ",
          term3: "விதிமுறைகள் மற்றும் நிபந்தனைகளை ஏற்கிறேன்",
          reg: "சமர்ப்பிக்கவும்",
          imp: "பதிவைத் தொடர்வதற்கு முன், பின்வரும் முக்கியமான விஷயங்களை மதிப்பாய்வு செய்வதை உறுதிசெய்யவும்:",
          pt1: "👉 உங்களிடம் சரியான மின்னஞ்சல் முகவரி உள்ளதா என்பதை உறுதி செய்து கொள்ளுங்கள், ஏனெனில் அது தகவல் தொடர்புக்கு பயன்படுத்தப்படும்.",
          pt2: "👉 அடையாள நோக்கங்களுக்காக தெளிவான மற்றும் சமீபத்திய புகைப்படத்தை பதிவேற்றவும்.",
          pt3: "👉 * என்று குறிக்கப்பட்ட அனைத்து புலங்களும் கட்டாயம் மற்றும் துல்லியமாக நிரப்பப்பட வேண்டும்.",
          pt4: "👉 ஆன்லைனில் புகார்களை பதிவு செய்ய ஆன்லைன் எஃப்ஐஆர் செயலாக்க அமைப்பு (OFPS) உள்ளது.",
          pt5: "👉 பதிவை முடிக்கும் முன் விதிமுறைகள் மற்றும் நிபந்தனைகளை படித்து புரிந்து கொள்ள வேண்டும்.",
          pt6: "⚠️ தவறான புகார்கள் ஐபிசியின் கீழ் வழக்குத் தொடரப்படும்.",
          pt7: "👉 ஆன்லைனில் புகார்களை பதிவு செய்ய ஆன்லைன் எஃப்ஐஆர் செயலாக்க அமைப்பு (OFPS) உள்ளது.",
          ptr: "நினைவில் கொள்ள வேண்டிய புள்ளிகள்",
          sustype:"சந்தேக வகையைத் தேர்ந்தெடுக்கவும்"
        }

      }
    },
    lng: "en", // default language
    fallbackLng: "en", // fallback language
    interpolation: {
      escapeValue: false // React already escapes
    }
  });

export default i18n;
