export function handleCsvFile(
  input: HTMLInputElement,
  callback: (data: any, name: string) => void,
  onError: () => void = () => null
) {
  const reader = new FileReader();

  if (input.files && input.files.length) {
    const file = input.files[0];
    if (!file.name.endsWith('.csv')) onError();
    else if (file) {
      reader.readAsText(file);
      reader.onload = () => callback(reader.result, file.name);
    }
  }
}

export function handleBase64File(
  input: HTMLInputElement,
  callback: (data: any) => void
) {
  const reader = new FileReader();

  if (input.files && input.files.length) {
    const file = input.files[0];
    reader.readAsDataURL(file);
    reader.onload = () => callback(reader.result);
  }
}
