import {LocaleObject, printValue} from 'yup';

let mixed: LocaleObject['mixed'] = {
  default: 'फ़ील्ड अमान्य है',
  required: 'फ़ील्ड एक आवश्यक फ़ील्ड है',
  defined: 'फ़ील्ड को परिभाषित किया जाना चाहिए',
  notNull: 'फ़ील्ड शून्य नहीं हो सकती',
  oneOf: 'फ़ील्ड निम्नलिखित मानों में से एक होना चाहिए: ${values}',
  notOneOf: 'फ़ील्ड निम्न मानों में से एक नहीं होनी चाहिए: ${values}',
  notType: ({path, type, value, originalValue}) => {
    const castMsg =
      originalValue != null && originalValue !== value
        ? ` (cast from the value \`${printValue(originalValue, true)}\`).`
        : '.';

    return type !== 'mixed'
      ? `Field must be a \`${type}\` type, ` +
          `but the final value was: \`${printValue(value, true)}\`` +
          castMsg
      : `Field must match the configured type. ` +
          `The validated value was: \`${printValue(value, true)}\`` +
          castMsg;
  },
};

let string: LocaleObject['string'] = {
  length: 'फ़ील्ड बिल्कुल ${length} वर्ण की होनी चाहिए',
  min: 'फ़ील्ड कम से कम ${min} अक्षर की होनी चाहिए',
  max: 'फ़ील्ड अधिकतम ${max} वर्णों की होनी चाहिए',
  matches: 'फ़ील्ड को निम्नलिखित से मेल खाना चाहिए: "${regex}"',
  email: 'फ़ील्ड एक वैध ईमेल होना चाहिए',
  url: 'फ़ील्ड एक मान्य URL होना चाहिए',
  uuid: 'फ़ील्ड एक वैध UUID होना चाहिए',
  trim: 'फ़ील्ड एक छंटनी वाली स्ट्रिंग होनी चाहिए',
  lowercase: 'फ़ील्ड एक लोअरकेस स्ट्रिंग होनी चाहिए',
  uppercase: 'फ़ील्ड एक अपरकेस स्ट्रिंग होनी चाहिए',
};

let number: LocaleObject['number'] = {
  min: 'फ़ील्ड ${min} से बड़ी या उसके बराबर होनी चाहिए',
  max: 'फ़ील्ड ${max} से कम या उसके बराबर होनी चाहिए',
  lessThan: 'फ़ील्ड ${less} से कम होनी चाहिए',
  moreThan: 'फ़ील्ड ${more} से बड़ी होनी चाहिए',
  positive: 'फ़ील्ड एक धनात्मक संख्या होनी चाहिए',
  negative: 'फ़ील्ड एक ऋणात्मक संख्या होनी चाहिए',
  integer: 'फ़ील्ड पूर्णांक होना चाहिए',
};

let date: LocaleObject['date'] = {
  min: 'फ़ील्ड ${min} के बाद का होना चाहिए',
  max: 'फ़ील्ड ${max} से पहले होना चाहिए',
};

let boolean: LocaleObject['boolean'] = {
  isValue: 'फ़ील्ड ${value} होना चाहिए',
};

let object: LocaleObject['object'] = {
  noUnknown: 'फ़ील्ड में अनिर्दिष्ट कुंजियाँ हैं: ${अज्ञात}',
};

let array: LocaleObject['array'] = {
  min: 'फ़ील्ड में कम से कम ${min} आइटम होने चाहिए',
  max: 'फ़ील्ड में ${max} आइटम से कम या उसके बराबर होना चाहिए',
  length: 'फ़ील्ड में ${length} आइटम होने चाहिए',
};

export default Object.assign(Object.create(null), {
  mixed,
  string,
  number,
  date,
  object,
  array,
  boolean,
}) as LocaleObject;
