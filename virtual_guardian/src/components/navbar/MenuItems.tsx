export const NavbarUserItems = [
  {
    user: 'admin', items: [
      {
        title: 'Services',
        url: '/admin/test',
      },
      {
        title: 'Experiments',
        url: '/admin/experiments',
      },
    ]
  },
  {
    user: 'patient', items: [
      {
        title: 'Appointments',
        url: '/patient/appointments',
      },
      {
        title: 'Chat',
        url: '/patient/chat',
      },
      {
        title: 'Products',
        url: '/admin',
      },
    ]
  },
  {
    user: 'caregiver', items: [
      {
        title: 'Patient Appointments',
        url: '/caregiver/patient/appointments',
      },
      {
        title: 'Chat',
        url: '/caregiver/chat',
      },
    ]
  },
  {
    user: 'doctor', items: [
      {
        title: 'Doctor',
        url: '#',
      },
      {
        title: 'Doctor',
        url: '/doctor',
      },
      {
        title: 'Doctor',
        url: '/doctor',
      },
    ]
  },
]