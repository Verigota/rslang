function clearForm(form: HTMLFormElement) {
  const fields = form.querySelectorAll('input');
  fields.forEach((field) => {
    const input = field;
    input.value = '';
  });
}
export default clearForm;
