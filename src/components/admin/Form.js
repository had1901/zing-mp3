


export const inputUserFormControl = [
    {
        name: 'username',
        label: 'Username',
        placeHolder: 'Enter username',
        componentType: 'Input',
        type: 'text',
    },
    {
        name: 'password',
        label: 'Password',
        placeHolder: 'Enter password',
        componentType: 'Input',
        type: 'text',
    },
    {
        name: 'role',
        label: 'Role',
        placeHolder: 'Enter role',
        componentType: 'Select',
        options: [
            {
                value: '1',
                label: 'Customer',
              },
              {
                value: '3',
                label: 'Tester',
              },
              {
                value: '4',
                label: 'Dev',
              },
              {
                value: '2',
                label: 'Admin',
                disabled: true,
              },
        ],
    },
]

export const inputMusicFormControl = [
    {
        name: 'title',
        label: 'Title',
        placeHolder: 'Enter title',
        componentType: 'Input',
        type: 'text',
    },
    {
        name: 'artist',
        label: 'Artist',
        placeHolder: 'Enter artist',
        componentType: 'Input',
        type: 'text',
    },
    {
        name: 'genre',
        label: 'Genre',
        placeHolder: 'Enter genre',
        componentType: 'Input',
        type: 'text',
    },
    {
        name: 'duration',
        label: 'Duration',
        placeHolder: 'Enter duration',
        componentType: 'Input',
        type: 'text',
    },
    {
        name: 'thumbnail',
        label: 'Thumbnail',
        placeHolder: 'Enter thumbnail',
        componentType: 'Input',
        type: 'text',
    },
    {
        name: 'url',
        label: 'Url',
        placeHolder: 'Enter url',
        componentType: 'Input',
        type: 'text',
    },
    {
        name: 'url_mp4',
        label: 'Url_mp4',
        placeHolder: 'Enter url_mp4',
        componentType: 'Input',
        type: 'text',
    },
]