export default function loadFile(file) {
  const reader = new FileReader();

  const promise = new Promise(resolve => {
    reader.onload = function (e) {
      resolve({url: e.target.result, file})
    };
  });

  reader.readAsDataURL(file);

  return promise
}