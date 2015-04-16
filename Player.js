function Player( id ) {
    if (!(this instanceof Player))
        return new Player();

    this.id   = id;
    this.name = "";
}

Player.prototype.setName = function ( name ) {
    this.name = name;
}



module.exports = Player;
