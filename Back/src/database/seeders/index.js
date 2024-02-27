import { UserModel } from "../models/index.js";

if(await UserModel.count() === 0){

  await UserModel.bulkCreate(
    [
      {
        username: "principal",
        password: "$2b$05$XNqSsEGMFYQ4/Gu237nVD.8MVlrgcgx5TKelk/6lsG2slqz2wkT2m",
        first_name: "Principal",
        last_name: "Principal",
        role: "PRINCIPAL",
        email: "principal@prueba.com",
        phone: "123456789",
        grade: 2,
      },
      {
        username: 'teacher1',
        password: '$2b$05$iQo8892Uo.0FXyxIDH1ile5nbwWhHoWGgInIl.qIYbBuDdRHIJA.m',
        first_name: 'profesor1',
        last_name: 'profeap',
        role: 'TEACHER',
        email: 'prof1@gmail.com',
        phone: '00000000',
        grade: 2,
      },
      {
        username: 'tutor1',
        password: '$2b$05$K1mHa/vN6efW6ozS44ThjumoDcCOic4SdaNgNtyBuzvvWRaHfCmjm',
        first_name: 'tutor1',
        last_name: 'tutorap',
        role: 'TUTOR',
        email: 'tuto1@gmail.com',
        phone: '00000000',
        grade: 2,
      },
      {
        username: 'student1',
        password: '$2b$05$YCl6DfIprXNm45ryZRVRXeyNIL1S8F7UBVzBOqUP9Vnjl/b5tn3Ai',
        first_name: 'student1',
        last_name: 'studentap',
        role: 'STUDENT',
        email: 'stu1@gmail.com',
        phone: '00000000',
        grade: 2
      }
    ]
  )
}