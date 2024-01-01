import {LocaleObject, printValue} from 'yup';

let mixed: LocaleObject['mixed'] = {
  default: 'الحقل غير صالح',
  required: 'الحقل هو حقل مطلوب',
  defined: 'يجب تحديد المجال',
  notNull: 'لا يمكن أن يكون الحقل فارغًا',
  oneOf: 'يجب أن يكون الحقل إحدى القيم التالية:${القيم}',
  notOneOf: 'يجب ألا يكون الحقل إحدى القيم التالية:${القيم}',
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
  length: 'يجب أن يتكون الحقل من أحرف ${length} بالضبط',
  min: 'يجب أن يتكون الحقل من ${min} حرفًا على الأقل',
  max: 'يجب أن يتكون الحقل من ${max} من الأحرف على الأكثر',
  matches: 'يجب أن يتطابق الحقل مع ما يلي: "${regex}"',
  email: 'يجب أن يكون الحقل بريدًا إلكترونيًا صالحًا',
  url: 'يجب أن يكون الحقل عنوان URL صالحًا',
  uuid: 'يجب أن يكون الحقل UUID صالحًا',
  trim: 'يجب أن يكون الحقل عبارة عن سلسلة مقطوعة',
  lowercase: 'يجب أن يكون الحقل سلسلة صغيرة',
  uppercase: 'يجب أن يكون الحقل عبارة عن سلسلة أحرف كبيرة',
};

let number: LocaleObject['number'] = {
  min: 'يجب أن يكون الحقل أكبر من أو يساوي ${min}',
  max: 'يجب أن يكون الحقل أقل من أو يساوي ${max}',
  lessThan: 'يجب أن يكون الحقل أقل من ${less}',
  moreThan: 'يجب أن يكون الحقل أكبر من ${more}',
  positive: 'يجب أن يكون الحقل رقمًا موجبًا',
  negative: 'يجب أن يكون الحقل رقمًا سالبًا',
  integer: 'يجب أن يكون الحقل عددًا صحيحًا',
};

let date: LocaleObject['date'] = {
  min: 'يجب أن يكون حقل الحقل بعد ${min}',
  max: 'يجب أن يكون حقل الحقل أقدم من ${max}',
};

let boolean: LocaleObject['boolean'] = {
  isValue: 'يجب أن يكون حقل الحقل ${value}',
};

let object: LocaleObject['object'] = {
  noUnknown: 'يحتوي الحقل على مفاتيح غير محددة: ${unknown}',
};

let array: LocaleObject['array'] = {
  min: 'يجب أن يحتوي الحقل على عناصر ${min} على الأقل',
  max: 'يجب أن يحتوي الحقل على عناصر أقل من أو تساوي ${max}.',
  length: 'يجب أن يحتوي الحقل على عناصر ${length}.',
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
