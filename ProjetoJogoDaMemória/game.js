let game = {
    lockMode: false,
    firstCard: null,
    secondCard: null,
    setCard: function (id) {
        let card = this.cards.filter(card => card.id === id)[0];

        if (card.flipped || this.lockMode) {
            return false;
        }
        if (!this.firstCard) {
            this.firstCard = card;
            this.firstCard.flipped = true;
            return true;
        } else {
            this.secondCard = card;
            this.secondCard.flipped = true;
            this.lockMode = true;
            return true;
        }


    },
    checkMatch: function () {
        return this.firstCard.icon === this.secondCard.icon;

    },
    clearCards: function () {
        this.firstCard = null;
        this.secondCard = null;
        this.lockMode = false;
    },
    techs: ['bitbucket',
        'angularjs',
        'activedirectory',
        'c',
        'cloud',
        'react',
        'nodejs',
        'php',
        'ios',
        'git'],
    cards: null,
    createCardsFromTechs: function () {
        this.cards = [];

        for (let tech of this.techs) {
            this.cards.push(this.createPairFromTech(tech));
        }
        this.cards = this.cards.flatMap(pair => pair);
        this.suffleCards();

    },

    createPairFromTech: function (tech) {
        return [{
            id: this.createIDWithTech(tech),
            icon: tech,
            flipped: false,
        },
        {
            id: this.createIDWithTech(tech),
            icon: tech,
            flipped: false,
        }
        ]

    },

    createIDWithTech: function (tech) {
        return tech + parseInt(Math.random() * 1000);
    },

    suffleCards: function () {
        let currentIndex = this.cards.length;
        let randomIndex = 0;
        while (currentIndex != 0) {
            randomIndex = Math.floor(Math.random() * currentIndex)
            currentIndex--;
            [this.cards[randomIndex], this.cards[currentIndex]] = [this.cards[currentIndex], this.cards[randomIndex]]
        }

    },
    unFlipCards: function () {
        this.firstCard.flipped = false;
        this.secondCard.flipped = false;
        this.clearCards();

    },
    checkGameOver:function(){
        return this.cards.filter(card=>!card.flipped).length == 0;

    }


}

