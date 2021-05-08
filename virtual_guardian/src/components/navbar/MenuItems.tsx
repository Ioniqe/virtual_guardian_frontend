export const NavbarUserItems = [
  {
    user: 'admin', items: [
      {
        title: 'Home',
        url: '/admin',
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
        title: 'Home',
        url: '/patient',
      },
      {
        title: 'Appointments',
        url: '/patient/appointments',
      },
      {
        title: 'Chat',
        url: '/patient/chat',
      },
    ]
  },
  {
    user: 'caregiver', items: [
      {
        title: 'Home',
        url: '/caregiver',
      },
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
        title: 'Home',
        url: '/doctor',
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