const fs = require('fs');

fetch('https://www.sheltonenergy.com/')
  .then(r => r.text())
  .then(html => {
    const urls = [];
    const regex = /<img[^>]+src=["']([^"']+)["']/g;
    let match;
    while ((match = regex.exec(html)) !== null) {
      urls.push(match[1]);
    }
    console.log("Images:", urls.filter(u => u.includes('logo') || u.includes('Shelton') || u.includes('.png') || u.includes('.svg') || u.includes('uploads')));
    fs.writeFileSync('temp_site.html', html);
  });
