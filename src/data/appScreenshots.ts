interface Screenshot {
  id: string;
  image: string;
  title: string;
  description: string;
}

interface AppScreenshots {
  appId: string;
  screenshots: Screenshot[];
}

export const appScreenshots: AppScreenshots[] = [
  {
    appId: 'car-care-log',
    screenshots: [
      {
        id: 'garage',
        image: '/car-care-log/garage.png',
        title: 'Your Vehicle Garage',
        description:
          'View and manage all your vehicles in one place. Add, edit, and delete vehicles as needed.',
      },
      {
        id: 'add-service',
        image: '/car-care-log/add-service.png',
        title: 'Log Service Records',
        description:
          'Record maintenance services with detailed information including date, mileage, cost, and notes. Keep track of all work performed on your vehicle. Add custom fields for specific maintenance needs.',
      },
      {
        id: 'service-history',
        image: '/car-care-log/service-history.png',
        title: 'Service History',
        description:
          'View your complete service history with detailed records.',
      },
      {
        id: 'statistics',
        image: '/car-care-log/statistics.png',
        title: 'Service Analytics',
        description:
          'Get insights into your vehicle service costs and patterns. Track expenses, service frequency, and service trends.',
      },
      {
        id: 'dark-light',
        image: '/car-care-log/dark-light.png',
        title: 'Dark & Light Modes',
        description:
          'Enjoy a comfortable viewing experience with both dark and light modes. The app automatically adjusts to your system preferences, or can be set manually.',
      },
      {
        id: 'custom-fields',
        image: '/car-care-log/custom-fields.png',
        title: 'Custom Service Fields',
        description:
          'Add custom fields to track the information that matters to you. Add custom fields for specific service or vehicle needs.',
      },
      {
        id: 'add-vehicle',
        image: '/car-care-log/add-vehicle.png',
        title: 'Add New Vehicles',
        description:
          'Add new vehicles with comprehensive details including make, model, year, VIN, and insurance information, via a custom field if needed.',
      },
    ],
  },
];

export const getAppScreenshots = (appId: string): Screenshot[] => {
  const app = appScreenshots.find((app) => app.appId === appId);
  return app?.screenshots || [];
};
