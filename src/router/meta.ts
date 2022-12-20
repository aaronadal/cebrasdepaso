// Meta attributes
function addMeta(atts: {[key: string]: string}) {
  const tag = document.createElement('meta');
  Object.keys(atts).forEach((key) => tag.setAttribute(key, atts[key]));
  tag.setAttribute('data-vue-router-meta', '');

  document.head.append(tag);
}

export function updateMeta(title: string, description?: string) {
  Array.from(document.querySelectorAll('[data-vue-router-meta]')).map(el => el.remove());

  document.title = title;
  addMeta({
    property: 'og:title',
    content: title,
  });
  addMeta({
    name: 'twitter:title',
    content: title,
  });

  if(description) {
    addMeta({
      name: 'description',
      content: description,
    });

    addMeta({
      property: 'og:description',
      content: description,
    });

    addMeta({
      name: 'twitter:description',
      content: description,
    });
  }
}
