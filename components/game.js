module.exports = class Game{
    constructor(link){
        this.link = link
        this.id = link.slice(20, 28)
        this.date
        this.white = 'Anonymous'
        this.black = 'Anonymous'
    }

    updateJson(json){
        this.id = json.id
        this.date = json.date
        this.black = json.players.black.user.id
        this.white = json.players.white.user.id
    }

    update(id, black, white){
        this.id = id
        this.black = black
        this.white = white
    }
}