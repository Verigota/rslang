import { Indexed } from '../../api/interfaces';

export function collectNewUserInfo<Info extends Indexed>(
  form: HTMLFormElement,
  excludedFields: string[],
): Info {
  const formFields = Array.from(form.querySelectorAll<HTMLInputElement>('input'));
  return formFields.reduce((prev, curr) => {
    const previous = prev as Indexed;
    if (!excludedFields.includes(curr.name)) {
      previous[curr.name] = curr.value;
    }
    return previous as Info;
  }, {} as Info);
}

export function clearForm(form: HTMLFormElement):void {
  const fields = form.querySelectorAll('input');
  fields.forEach((field) => {
    const input = field;
    input.value = '';
  });
}
