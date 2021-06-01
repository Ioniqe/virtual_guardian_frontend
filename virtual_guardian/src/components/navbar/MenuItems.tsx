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
    ]
  },
  {
    user: 'patient', items: [
      {
        title: 'Test for disease',
        url: '/patient/test',
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
        title: `Patient's activities`,
        url: '/caregiver/patient/activities',
      },
      {
        title: 'Abnormal behaviour',
        url: '/caregiver/patient/abnormal_behaviour',
      },
      {
        title: 'Annotate labels',
        url: '/caregiver/annotate_labels',
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
      // {
      //   title: 'Abnormal behaviour',
      //   url: '/doctor/patient/abnormal_behaviour',
      // },
    ]
  },
]