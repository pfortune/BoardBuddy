export const seedData = {
    users: {
      _model: "User",
      admin: {
        firstName: "Homer",
        lastName: "Simpson",
        email: "homer@simpson.com",
        password: "secret", 
        permission: "ADMIN"
      },
      margeSimpson: {
        firstName: "Marge",
        lastName: "Simpson",
        email: "marge@simpson.com",
        password: "secret",
        permission: "USER"
      },
      lisaSimpson: {
        firstName: "Lisa",
        lastName: "Simpson",
        email: "lisa@simpson.com",
        password: "secret",
        permission: "USER"
      }
    },
    locations: {
      _model: "Location",
      galwayLibrary: {
        title: "Galway City Library",
        category: "Library",
        x: 53.274,
        y: -9.0494,
        img: "library.jpg",
        userid: "->users.margeSimpson"
      },
      dublinCafe: {
        title: "Dublin Board Game Cafe",
        category: "Cafe",
        x: 53.3498,
        y: -6.2603,
        img: "cafe.jpg",
        userid: "->users.lisaSimpson"
      },
      corkBookstore: {
        title: "Cork City Bookstore",
        category: "Bookstore",
        x: 51.8985,
        y: -8.4756,
        img: "bookstore.jpg",
        userid: "->users.margeSimpson"
      },
       limerickRestaurant: {
        title: "Limerick Gourmet Restaurant",
        category: "Restaurant",
        x: 52.6638,
        y: -8.6267,
        img: "restaurant.jpg",
        userid: "->users.lisaSimpson"
      },
    },
    games: {
        _model: "Game",
        settlersOfCatan: {
          title: "Settlers of Catan",
          age: 10,
          minPlayers: 3,
          maxPlayers: 4,
          duration: 120,
          description: "A multiplayer board game where players collect resources and build settlements.",
          category: "Strategy",
          locationid: "->locations.galwayLibrary"
        },
        pandemic: {
          title: "Pandemic",
          age: 8,
          minPlayers: 2,
          maxPlayers: 4,
          duration: 45,
          description: "Players work together to treat infections around the world while gathering resources for cures.",
          category: "Cooperative",
          locationid: "->locations.dublinCafe"
        },
        ticketToRide: {
          title: "Ticket to Ride",
          age: 8,
          minPlayers: 2,
          maxPlayers: 5,
          duration: 60,
          description: "Players collect train cards to claim railway routes connecting cities across North America.",
          category: "Family",
          locationid: "->locations.limerickRestaurant"
        },
        chess: {
          title: "Chess",
          age: 6,
          minPlayers: 2,
          maxPlayers: 2,
          duration: 30,
          description: "A strategy board game of medieval warfare played on a chessboard.",
          category: "Strategy",
          locationid: "->locations.limerickRestaurant"
        },
        monopoly: {
          title: "Monopoly",
          age: 8,
          minPlayers: 2,
          maxPlayers: 6,
          duration: 180,
          description: "Players roll two six-sided dice to move around the game board, buying and trading properties, and developing them with houses and hotels.",
          category: "Family",
          locationid: "->locations.galwayLibrary"
        },
        carrom: {
          title: "Carrom",
          age: 7,
          minPlayers: 2,
          maxPlayers: 4,
          duration: 90,
          description: "A tabletop game of Indian origin. The game is very popular in India, Nepal, Afghanistan, Bangladesh, Sri Lanka, and surrounding areas, and is known by various names in different languages.",
          category: "Abstract",
          locationid: "->locations.dublinCafe"
        },
        codenames: {
          title: "Codenames",
          age: 14,
          minPlayers: 2,
          maxPlayers: 8,
          duration: 15,
          description: "A social word game with a simple premise and challenging game play. Two rival spymasters know the secret identities of 25 agents. Their teammates know the agents only by their codenames.",
          category: "Party",
          locationid: "->locations.limerickRestaurant"
        },
        azul: {
          title: "Azul",
          age: 8,
          minPlayers: 2,
          maxPlayers: 4,
          duration: 45,
          description: "Players take turns drafting colored tiles from suppliers to their player board. Later in the round, players score points based on how they've placed their tiles to decorate the palace.",
          category: "Abstract",
          locationid: "->locations.galwayLibrary"
        },
        splendor: {
            title: "Splendor",
            age: 10,
            minPlayers: 2,
            maxPlayers: 4,
            duration: 30,
            description: "Players are merchants of the Renaissance trying to buy gem mines, means of transportation, shops—all in order to acquire the most prestige points.",
            category: "Strategy",
            locationid: "->locations.dublinCafe"
          },
          sevenWonders: {
            title: "7 Wonders",
            age: 10,
            minPlayers: 2,
            maxPlayers: 7,
            duration: 30,
            description: "Lead one of the seven great cities of the Ancient world. Exploit the natural resources of your lands, take part in the eternal march of progress, develop your commercial relationships, and assert your military might.",
            category: "Strategy",
            locationid: "->locations.galwayLibrary"
          },
          kingOfTokyo: {
            title: "King of Tokyo",
            age: 8,
            minPlayers: 2,
            maxPlayers: 6,
            duration: 30,
            description: "Players take on the role of giant monsters vying for dominance. Players earn victory points by controlling Tokyo, attacking other monsters, and achieving specific objectives.",
            category: "Family",
            locationid: "->locations.limerickRestaurant"
          },
          dominion: {
            title: "Dominion",
            age: 13,
            minPlayers: 2,
            maxPlayers: 4,
            duration: 30,
            description: "A deck-building card game where players use a random set of kingdom cards, with players selecting cards that then become part of their deck to be used to draw hands and buy further cards.",
            category: "Card Game",
            locationid: "->locations.dublinCafe"
          },
          terraformingMars: {
            title: "Terraforming Mars",
            age: 12,
            minPlayers: 1,
            maxPlayers: 5,
            duration: 120,
            description: "Players act as corporations working together to terraform the planet Mars by raising the temperature, creating ocean areas, and creating habitable living areas.",
            category: "Strategy",
            locationid: "->locations.galwayLibrary"
          },
          gloomhaven: {
            title: "Gloomhaven",
            age: 14,
            minPlayers: 1,
            maxPlayers: 4,
            duration: 120,
            description: "A game of Euro-inspired tactical combat in a persistent world of shifting motives. Players will take on the role of a wandering adventurer with their own special set of skills and their own reasons for traveling to this dark corner of the world.",
            category: "Adventure",
            locationid: "->locations.limerickRestaurant"
          },
          theMind: {
            title: "The Mind",
            age: 8,
            minPlayers: 2,
            maxPlayers: 4,
            duration: 20,
            description: "An innovative, cooperative card game where players must silently synchronize their minds to successfully play cards in ascending order.",
            category: "Party",
            locationid: "->locations.dublinCafe"
          },
          scythe: {
            title: "Scythe",
            age: 14,
            minPlayers: 1,
            maxPlayers: 5,
            duration: 115,
            description: "An engine-building game set in an alternate-history 1920s period. It is a time of farming and war, broken hearts and rusted gears, innovation, and valor.",
            category: "Strategy",
            locationid: "->locations.galwayLibrary"
          }
        
      }      
  };
  