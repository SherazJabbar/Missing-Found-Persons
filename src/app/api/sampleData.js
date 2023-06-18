export const sampleData = [
    {
        id: '1',
        title: 'Trip to Empire State building',
        date: new Date('2018-03-21'),
        category: 'culture',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus sollicitudin ligula eu leo tincidunt, quis scelerisque magna dapibus. Sed eget ipsum vel arcu vehicula ullamcorper.',
        city: {
            address: 'NY, USA',
            latlng: {
                lat: 40.7484405,
                lng:  -73.98566440000002
            }
        },
        venue: {
            address: 'Empire State Building, 5th Avenue, New York, NY, USA',
            latlng: {
                lat: 40.7484405,
                lng:  -73.98566440000002
            }
        },
        hostedBy: 'Bob',
        hostPhotoURL: 'https://randomuser.me/api/portraits/men/20.jpg',
        attendees: [
            {
                id: 'a',
                name: 'Bob',
                photoURL: 'https://randomuser.me/api/portraits/men/20.jpg'
            },
            {
                id: 'b',
                name: 'Tom',
                photoURL: 'https://randomuser.me/api/portraits/men/22.jpg'
            }
        ]
    },
    
       
];
