export const NavbarUserItems = [
  {
    user: 'admin', items: [
      {
        title: 'Admin List',
        url: '/admin/list',
      },
      {
        title: 'Experiments',
        url: '/admin/experiments',
      },
      {
        title: 'Modify Patient Of Activities',
        url: '/admin/activities',
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
        title: 'Patients List',
        url: '/caregiver/patient/list',
      },
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
        title: 'Patients List',
        url: '/doctor/patient/list',
      },
      {
        title: 'Caregivers List',
        url: '/doctor/caregiver/list',
      },
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