module.exports = function convertToId (str) {

  const ruToEnd = {
    'а': 'a', 'б': 'b', 'в': 'v', 'г': 'g', 'д': 'd',
    'е': 'e', 'ё': 'e', 'ж': 'j', 'з': 'z', 'и': 'i',
    'к': 'k', 'л': 'l', 'м': 'm', 'н': 'n', 'о': 'o',
    'п': 'p', 'р': 'r', 'с': 's', 'т': 't', 'у': 'u',
    'ф': 'f', 'х': 'h', 'ц': 'c', 'ч': 'ch', 'ш': 'sh',
    'щ': 'shch', 'ы': 'y', 'э': 'e', 'ю': 'u', 'я': 'ya'
  }

  const translitedArr = [];

  str = str.replace(" ", "-").replace(/[^\wа-яёА-ЯЁ]+/g, '').replace(/[ъь]+/g, '').replace(/й/g, 'i');

  for ( let i = 0; i < str.length; ++i ) {
    translitedArr.push(
      ruToEnd[ str[i] ]
      || ruToEnd[ str[i].toLowerCase() ] === undefined && str[i]
      || ruToEnd[ str[i].toLowerCase() ].replace(/^(.)/, ( match ) => match.toUpperCase())
    );
  }

  return translitedArr.join('');
};
