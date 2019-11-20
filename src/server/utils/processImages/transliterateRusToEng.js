module.exports = function convertToId (str) {
  const ruToEnd = {
    'а': 'a', 'б': 'b', 'в': 'v', 'г': 'g', 'д': 'd',
    'е': 'e', 'ё': 'e', 'ж': 'j', 'з': 'z', 'и': 'i', 'й': 'i',
    'к': 'k', 'л': 'l', 'м': 'm', 'н': 'n', 'о': 'o',
    'п': 'p', 'р': 'r', 'с': 's', 'т': 't', 'у': 'u',
    'ф': 'f', 'х': 'h', 'ц': 'c', 'ч': 'ch', 'ш': 'sh',
    'щ': 'shch', 'ы': 'y', 'э': 'e', 'ю': 'u', 'я': 'ya'
  };

  const translitedArr = [];

  const trasnformedStr = str.replace(" ", "-")
    .replace(/[^\wа-яёА-ЯЁ]+/g, '')
    .replace(/[ъь]+/g, '')
    .toLocaleLowerCase();

  for ( let i = 0; i < trasnformedStr.length; ++i ) {
    translitedArr.push(
     ruToEnd[ trasnformedStr[i].toLowerCase() ] || trasnformedStr[i]
    );
  }

  return translitedArr.join('');
};
