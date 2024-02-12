package com.vaccine.vaccination.DTO;

import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@ToString
@Getter
@Setter
public class BookAppointmentDTO {
    private Long id;
    private String name;
    private String date;
    private String time;
    private String phonenumber;
    private String centerName;

}
