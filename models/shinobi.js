export function Shinobi(name, team, picture, village) {
    this.name = name
    this.slug = name.toLowerCase().replace(/\s/g, "-")
    this.team = team
    this.picture = picture
    this.village = village
}

