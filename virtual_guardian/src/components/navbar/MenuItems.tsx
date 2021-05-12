export const NavbarUserItems = [
  {
    user: 'admin', items: [
      {
        title: 'Experiments',
        url: '/admin/experiments',
      },
    ]
  },
  {
    user: 'patient', items: [
      {
        title: 'Test for disease',
        url: '/patient/test',
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
        title: 'Patient Appointments',
        url: '/caregiver/patient/appointments',
      },
      {
        title: `Patient's activities`,
        url: '/caregiver/patient/activities',
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
        title: `Patient's activities`,
        url: '/doctor/patient/activities',
      },
      {
        title: 'Patient Appointments',
        url: '/doctor/patient/appointments',
      },
      {
        title: 'Medications',
        url: '/doctor/medications/graph',
      },
    ]
  },
]