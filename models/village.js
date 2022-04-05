export function Village(name, nameMeaning, picture, country, hokages) {
    this.name = name
    this.slug = name.toLowerCase().replace(/\s/g, "-")
    this.nameMeaning = nameMeaning
    this.country = country
    this.picture = picture
    this.hokages = hokages
}

