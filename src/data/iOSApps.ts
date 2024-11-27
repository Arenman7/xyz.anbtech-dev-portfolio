export interface IOSApp {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  technologies: string[];
  features: {
    header: string;
    description: string;
  }[];
  appStoreLink?: string;
  githubLink?: string;
  detailedDescription: string;
}

export const iOSApps: IOSApp[] = [
  {
    id: 'vehicle-service-manager',
    title: 'Vehicle Service Manager',
    description:
      'A comprehensive iOS application built with SwiftUI and SwiftData, designed to help car owners track maintenance, repairs, and overall vehicle health.',
    imageUrl: '/vehicle-service-manager/preview.png',
    technologies: ['Swift', 'SwiftUI', 'SwiftData', 'StoreKit'],
    features: [
      {
        header: 'Export Data',
        description:
          'Export data to PDF or CSV files for easy sharing and analysis.',
      },
      {
        header: 'Vehicle Management',
        description:
          'View and manage all your vehicles in one place with the ability to add, edit, and delete vehicles as needed.',
      },
      {
        header: 'Attachment Functionality',
        description:
          'Upload and manage attachments like photos, and documents for maintenance records, or for vehicle information.',
      },
      {
        header: 'Service History Tracking',
        description:
          "Access and review your complete service history with detailed records, making it easy to track your vehicle's maintenance over time.",
      },
      {
        header: 'Maintenance Analytics',
        description:
          'Get insights into your vehicle service costs and patterns, helping you track expenses, service frequency, and maintenance trends.',
      },
      {
        header: 'Customizable Experience',
        description:
          'Enjoy both dark and light modes that automatically adjust to your system preferences or can be set manually for optimal viewing comfort.',
      },
    ],
    appStoreLink:
      'https://apps.apple.com/us/app/vehicle-service-manager/id6737859842',
    detailedDescription: `
      Vehicle Service Manager is a modern iOS application built with Swift and SwiftUI, designed to simplify vehicle maintenance tracking. 
      The app leverages Core Data for efficient local storage and CloudKit for seamless data synchronization across devices.

      Users can easily log and track their vehicle's maintenance history, set up reminders for upcoming services, 
      and monitor expenses related to their vehicle's upkeep. The intuitive interface makes it simple to add new 
      maintenance records, view service history, and stay on top of vehicle care.

      Key technical achievements include implementing a robust data synchronization system, creating an 
      intuitive user interface with smooth animations, and ensuring reliable local data persistence.
    `,
  },
];
