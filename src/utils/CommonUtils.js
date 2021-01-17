export const createElement = (tag, ...classList) => {
  const element = document.createElement(tag);
  if (classList && classList.length > 0) {
    element.classList.add(...classList.filter(Boolean));
  }
  return element;
};

export const createSvgObject = (svgName) => `<object type="image/svg+xml" data="./assets/icons/${svgName}.svg">
    Your browser does not support SVG
</object>`;

export const createIcon = (name, ...classList) => `<i class="material-icons ${classList
  ? classList.join(' ')
  : ''
}">${name}</i>`;
