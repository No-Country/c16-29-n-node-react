CREATE TABLE `Users` (
  `id` integer PRIMARY KEY,
  `username` varchar(255) NOT NULL COMMENT 'DNI',
  `password` varchar(255) NOT NULL,
  `first_name` varchar(255) NOT NULL,
  `last_name` varchar(255) NOT NULL,
  `role` ENUM ('PRINCIPAL', 'TEACHER', 'TUTOR', 'STUDENT'),
  `email` varchar(255),
  `phone` varchar(255),
  `created_at` timestamp,
  `updated_at` timestamp
);

CREATE TABLE `StudentsTutors` (
  `id` integer PRIMARY KEY,
  `student_id` integer,
  `tutor_id` integer
);

CREATE TABLE `TeacherSubjects` (
  `id` integer PRIMARY KEY,
  `subject_id` integer NOT NULL,
  `teacher_id` integer NOT NULL
);

CREATE TABLE `StundetSubjects` (
  `id` integer PRIMARY KEY,
  `subject_id` integer NOT NULL,
  `student_id` integer NOT NULL
);

CREATE TABLE `Subjects` (
  `id` integer PRIMARY KEY,
  `name` varchar(255) NOT NULL,
  `grade` varchar(255) NOT NULL,
  `divition` varchar(255) NOT NULL
);

CREATE TABLE `Marks` (
  `id` integer PRIMARY KEY,
  `score` integer NOT NULL,
  `note` varchar(255),
  `subject_id` integer NOT NULL,
  `student_id` integer NOT NULL,
  `teacher_id` integer NOT NULL,
  `created_at` timestamp,
  `updated_at` timestamp
);

CREATE TABLE `Banns` (
  `id` integer PRIMARY KEY,
  `score` ENUM ('EXPELLED', 'SUSPENDED', 'WARNING') NOT NULL,
  `note` varchar(255) NOT NULL,
  `subject_id` integer,
  `student_id` integer NOT NULL,
  `teacher_id` integer NOT NULL
);

CREATE TABLE `Attendances` (
  `id` integer PRIMARY KEY,
  `type` ENUM ('NON_ATTENDANCE', 'DELAYED'),
  `date` timestamp NOT NULL,
  `teacher_id` integer NOT NULL,
  `student_id` integer NOT NULL,
  `subject_id` integer NOT NULL
);

CREATE TABLE `Notes` (
  `id` integer PRIMARY KEY,
  `note` varchar(255) NOT NULL,
  `is_public` boolean NOT NULL,
  `teacher_id` integer NOT NULL,
  `student_id` integer NOT NULL,
  `subject_id` integer
);

ALTER TABLE `StudentsTutors` ADD FOREIGN KEY (`student_id`) REFERENCES `Users` (`id`);

ALTER TABLE `StudentsTutors` ADD FOREIGN KEY (`tutor_id`) REFERENCES `Users` (`id`);

ALTER TABLE `Subjects` ADD FOREIGN KEY (`id`) REFERENCES `TeacherSubjects` (`subject_id`);

ALTER TABLE `Users` ADD FOREIGN KEY (`id`) REFERENCES `TeacherSubjects` (`teacher_id`);

ALTER TABLE `Subjects` ADD FOREIGN KEY (`id`) REFERENCES `StundetSubjects` (`subject_id`);

ALTER TABLE `Users` ADD FOREIGN KEY (`id`) REFERENCES `StundetSubjects` (`student_id`);

ALTER TABLE `Marks` ADD FOREIGN KEY (`subject_id`) REFERENCES `Subjects` (`id`);

ALTER TABLE `Marks` ADD FOREIGN KEY (`student_id`) REFERENCES `Users` (`id`);

ALTER TABLE `Marks` ADD FOREIGN KEY (`teacher_id`) REFERENCES `Users` (`id`);

ALTER TABLE `Banns` ADD FOREIGN KEY (`subject_id`) REFERENCES `Subjects` (`id`);

ALTER TABLE `Banns` ADD FOREIGN KEY (`student_id`) REFERENCES `Users` (`id`);

ALTER TABLE `Banns` ADD FOREIGN KEY (`teacher_id`) REFERENCES `Users` (`id`);

ALTER TABLE `Users` ADD FOREIGN KEY (`id`) REFERENCES `Attendances` (`student_id`);

ALTER TABLE `Users` ADD FOREIGN KEY (`id`) REFERENCES `Notes` (`teacher_id`);

ALTER TABLE `Users` ADD FOREIGN KEY (`id`) REFERENCES `Notes` (`student_id`);

ALTER TABLE `Subjects` ADD FOREIGN KEY (`id`) REFERENCES `Notes` (`subject_id`);
