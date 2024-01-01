import {LocaleObject, printValue} from 'yup';

let mixed: LocaleObject['mixed'] = {
  default: 'ক্ষেত্রটি অবৈধ৷',
  required: 'ক্ষেত্র একটি প্রয়োজনীয় ক্ষেত্র',
  defined: 'ক্ষেত্র সংজ্ঞায়িত করা আবশ্যক',
  notNull: 'ক্ষেত্র শূন্য হতে পারে না',
  oneOf: 'ক্ষেত্রটি অবশ্যই নিম্নলিখিত মানগুলির মধ্যে একটি হতে হবে: ${values}',
  notOneOf:
    'ক্ষেত্রটি অবশ্যই নিম্নলিখিত মানগুলির মধ্যে একটি হতে হবে না: ${values}',
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
  length: 'ক্ষেত্রটি অবশ্যই ${length} অক্ষরের হতে হবে৷',
  min: 'ক্ষেত্রটি কমপক্ষে ${min} অক্ষরের হতে হবে৷',
  max: 'ক্ষেত্রটি অবশ্যই সর্বাধিক ${max} অক্ষরের হতে হবে৷',
  matches: 'ক্ষেত্র অবশ্যই নিম্নলিখিতগুলির সাথে মিলবে: "${regex}"',
  email: 'ক্ষেত্র একটি বৈধ ইমেল হতে হবে',
  url: 'ক্ষেত্রটি অবশ্যই একটি বৈধ URL হতে হবে৷',
  uuid: 'ক্ষেত্র অবশ্যই একটি বৈধ UUID হতে হবে',
  trim: 'ক্ষেত্র একটি ছাঁটা স্ট্রিং হতে হবে',
  lowercase: 'ক্ষেত্রটি অবশ্যই একটি ছোট হাতের স্ট্রিং হতে হবে',
  uppercase: 'ক্ষেত্রটি অবশ্যই একটি বড় হাতের স্ট্রিং হতে হবে৷',
};

let number: LocaleObject['number'] = {
  min: 'Field must be greater than or equal to ${min}',
  max: 'Field must be less than or equal to ${max}',
  lessThan: 'Field must be less than ${less}',
  moreThan: 'Field must be greater than ${more}',
  positive: 'ক্ষেত্রটি অবশ্যই একটি ধনাত্মক সংখ্যা হতে হবে',
  negative: 'ক্ষেত্রটি অবশ্যই একটি ঋণাত্মক সংখ্যা হতে হবে',
  integer: 'ক্ষেত্র একটি পূর্ণসংখ্যা হতে হবে',
};

let date: LocaleObject['date'] = {
  min: 'ক্ষেত্র অবশ্যই ${min} এর পরে হতে হবে',
  max: 'ক্ষেত্র অবশ্যই ${max} এর আগে হতে হবে',
};

let boolean: LocaleObject['boolean'] = {
  isValue: 'ক্ষেত্র অবশ্যই ${value} হতে হবে',
};

let object: LocaleObject['object'] = {
  noUnknown: 'ক্ষেত্রের অনির্দিষ্ট কী আছে: ${unknown}',
};

let array: LocaleObject['array'] = {
  min: 'ক্ষেত্রে কমপক্ষে ${min} আইটেম থাকতে হবে',
  max: 'ফিল্ডে অবশ্যই ${max} এর থেকে কম বা সমান আইটেম থাকতে হবে',
  length: 'ফিল্ডে অবশ্যই ${length} আইটেম থাকতে হবে',
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
