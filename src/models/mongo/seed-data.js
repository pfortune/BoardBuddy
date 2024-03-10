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
      johnDoe: {
        firstName: "Marge",
        lastName: "Simpson",
        email: "marge@simpson.com",
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
        userid: "->users.johnDoe"
      },
      dublinCafe: {
        title: "Dublin Board Game Cafe",
        category: "Cafe",
        x: 53.3498,
        y: -6.2603,
        img: "cafe.jpg",
        userid: "->users.admin"
      },
      corkBookstore: {
        title: "Cork City Bookstore",
        category: "Bookstore",
        x: 51.8985,
        y: -8.4756,
        img: "bookstore.jpg",
        userid: "->users.johnDoe"
      },
       limerickRestaurant: {
        title: "Limerick Gourmet Restaurant",
        category: "Restaurant",
        x: 52.6638,
        y: -8.6267,
        img: "restaurant.jpg",
        userid: "->users.admin"
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
      }
    }
  };
  