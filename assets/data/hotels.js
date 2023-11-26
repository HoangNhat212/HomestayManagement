const hotels = [
  {
    id: '1',
    name: 'Silver Hotel & SPA',
    location: 'Green street,Central district',
    price: 120,
    image: require('../images/hotel1.jpg'),
    slogan: 'Nơi tình cảm thăng hoa',
    details:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Consequat nisl vel pretium lectus quam id leo. Velit euismod in pellentesque massa placerat duis ultricies lacus sed. Justo laoreet sit amet cursus sit',
    rating: '4.7',
    ratingvote: '(2.1m)',
    rooms: [
      {
        id: '1',
        roomtype: 'Single Room',
        timetype: 'Hourly',
        price: 120,
        condition: ['Double Bed', '18m^2', 'Window'],
        provision: [
          'Thanh toán tại khách sạn',
          'Nhận thưởng lên đến 1.080 điểm',
        ],
      },
      {
        id: '2',
        roomtype: 'Double Room',
        timetype: 'Hourly',
        price: 200,
        condition: ['Double Bed', '25m^2', 'Window'],
        provision: [
          'Thanh toán tại khách sạn',
          'Nhận thưởng lên đến 1.080 điểm',
        ],
      },
    ],
    policy: 'Hủy miễn phí trước giờ nhận phòng 1 tiếng.',
  },
  {
    id: '2',
    name: 'Bring Hotel',
    location: 'Yuki street',
    price: 70,
    image: require('../images/hotel2.jpg'),
    slogan: 'Giao lưu ân ái thoải mái',
    details:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Consequat nisl vel pretium lectus quam id leo. Velit euismod in pellentesque massa placerat duis ultricies lacus sed. Justo laoreet sit amet cursus sit',
    rating: '4.6',
    ratingvote: '(2m)',
    rooms: [
      {
        id: '1',
        roomtype: 'Single Room',
        timetype: 'Hourly',
        price: 120,
        condition: ['Double Bed', '18m^2', 'Window'],
        provision: [
          'Thanh toán tại khách sạn',
          'Nhận thưởng lên đến 1.080 điểm',
        ],
      },
      {
        id: '2',
        roomtype: 'Double Room',
        timetype: 'Hourly',
        price: 200,
        condition: ['Double Bed', '25m^2', 'Window'],
        provision: [
          'Thanh toán tại khách sạn',
          'Nhận thưởng lên đến 1.080 điểm',
        ],
      },
    ],
    policy: 'Hủy miễn phí trước giờ nhận phòng 1 tiếng.',
  },
  {
    id: '3',
    name: 'Aluna Hotel',
    location: 'Almond street',
    price: 90,
    image: require('../images/hotel3.jpg'),
    slogan: 'Độc - lạ - rẻ - trẻ - khỏe',
    details:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Consequat nisl vel pretium lectus quam id leo. Velit euismod in pellentesque massa placerat duis ultricies lacus sed. Justo laoreet sit amet cursus sit',
    rating: '4.0',
    ratingvote: '(1.2m)',
    rooms: [
      {
        id: '1',
        roomtype: 'Single Room',
        timetype: 'Hourly',
        price: 120,
        condition: ['Double Bed', '18m^2', 'Window'],
        provision: [
          'Thanh toán tại khách sạn',
          'Nhận thưởng lên đến 1.080 điểm',
        ],
      },
      {
        id: '2',
        roomtype: 'Double Room',
        timetype: 'Hourly',
        price: 200,
        condition: ['Double Bed', '25m^2', 'Window'],
        provision: [
          'Thanh toán tại khách sạn',
          'Nhận thưởng lên đến 1.080 điểm',
        ],
      },
    ],
    policy: 'Hủy miễn phí trước giờ nhận phòng 1 tiếng.',
  },
  {
    id: '4',
    name: 'Green Hotel',
    location: 'Main street',
    price: 100,
    image: require('../images/hotel4.jpg'),
    slogan: 'Không chỉ là nơi để nghỉ',
    details:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Consequat nisl vel pretium lectus quam id leo. Velit euismod in pellentesque massa placerat duis ultricies lacus sed. Justo laoreet sit amet cursus sit',
    rating: '4.7',
    ratingvote: '(2.4m)',
    rooms: [
      {
        id: '1',
        roomtype: 'Single Room',
        timetype: 'Hourly',
        price: 120,
        condition: ['Double Bed', '18m^2', 'Window'],
        provision: [
          'Thanh toán tại khách sạn',
          'Nhận thưởng lên đến 1.080 điểm',
        ],
      },
      {
        id: '2',
        roomtype: 'Double Room',
        timetype: 'Hourly',
        price: 200,
        condition: ['Double Bed', '25m^2', 'Window'],
        provision: [
          'Thanh toán tại khách sạn',
          'Nhận thưởng lên đến 1.080 điểm',
        ],
      },
    ],
    policy: 'Hủy miễn phí trước giờ nhận phòng 1 tiếng.',
  },
  {
    id: '5',
    name: 'Green Hotel',
    location: 'Main street',
    price: 100,
    image: require('../images/hotel4.jpg'),
    slogan: 'Không chỉ là nơi để nghỉ',
    details:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Consequat nisl vel pretium lectus quam id leo. Velit euismod in pellentesque massa placerat duis ultricies lacus sed. Justo laoreet sit amet cursus sit',
    rating: '4.7',
    ratingvote: '(2.4m)',
    rooms: [
      {
        id: '1',
        roomtype: 'Single Room',
        timetype: 'Hourly',
        price: 120,
        condition: ['Double Bed', '18m^2', 'Window'],
        provision: [
          'Thanh toán tại khách sạn',
          'Nhận thưởng lên đến 1.080 điểm',
        ],
      },
      {
        id: '2',
        roomtype: 'Double Room',
        timetype: 'Hourly',
        price: 200,
        condition: ['Double Bed', '25m^2', 'Window'],
        provision: [
          'Thanh toán tại khách sạn',
          'Nhận thưởng lên đến 1.080 điểm',
        ],
      },
    ],
    policy: 'Hủy miễn phí trước giờ nhận phòng 1 tiếng.',
  },
  {
    id: '6',
    name: 'Green Hotel',
    location: 'Main street',
    price: 100,
    image: require('../images/hotel4.jpg'),
    slogan: 'Không chỉ là nơi để nghỉ',
    details:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Consequat nisl vel pretium lectus quam id leo. Velit euismod in pellentesque massa placerat duis ultricies lacus sed. Justo laoreet sit amet cursus sit',
    rating: '4.7',
    ratingvote: '(2.4m)',
    rooms: [
      {
        id: '1',
        roomtype: 'Single Room',
        timetype: 'Hourly',
        price: 120,
        condition: ['Double Bed', '18m^2', 'Window'],
        provision: [
          'Thanh toán tại khách sạn',
          'Nhận thưởng lên đến 1.080 điểm',
        ],
      },
      {
        id: '2',
        roomtype: 'Double Room',
        timetype: 'Hourly',
        price: 200,
        condition: ['Double Bed', '25m^2', 'Window'],
        provision: [
          'Thanh toán tại khách sạn',
          'Nhận thưởng lên đến 1.080 điểm',
        ],
      },
    ],
    policy: 'Hủy miễn phí trước giờ nhận phòng 1 tiếng.',
  },
  {
    id: '7',
    name: 'Green Hotel',
    location: 'Main street',
    price: 100,
    image: require('../images/hotel4.jpg'),
    slogan: 'Không chỉ là nơi để nghỉ',
    details:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Consequat nisl vel pretium lectus quam id leo. Velit euismod in pellentesque massa placerat duis ultricies lacus sed. Justo laoreet sit amet cursus sit',
    rating: '4.7',
    ratingvote: '(2.4m)',
    rooms: [
      {
        id: '1',
        roomtype: 'Single Room',
        timetype: 'Hourly',
        price: 120,
        condition: ['Double Bed', '18m^2', 'Window'],
        provision: [
          'Thanh toán tại khách sạn',
          'Nhận thưởng lên đến 1.080 điểm',
        ],
      },
      {
        id: '2',
        roomtype: 'Double Room',
        timetype: 'Hourly',
        price: 200,
        condition: ['Double Bed', '25m^2', 'Window'],
        provision: [
          'Thanh toán tại khách sạn',
          'Nhận thưởng lên đến 1.080 điểm',
        ],
      },
    ],
    policy: 'Hủy miễn phí trước giờ nhận phòng 1 tiếng.',
  },
];

export default hotels;
