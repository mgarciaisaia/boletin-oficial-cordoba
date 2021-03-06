# Boletín Oficial Córdoba

Query para las DevTools de Chrome para obtener los links a todos los PDFs de un mes (estando en la página del mes, como https://boletinoficial.cba.gov.ar/2019/06/):

```js
var links = []; document.querySelector('.left').querySelectorAll('a[href]').forEach(link => links.push(link.href)); copy(links)
```

Link a los PDFs en Mega.nz (hasta el 21FEB2021): https://mega.nz/file/Cw5iiTJa#4shwqC9jvnKbQzuCH_uXlUiAX0fqo3sqjjK8wnD9QXY
