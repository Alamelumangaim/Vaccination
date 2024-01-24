package com.vaccine.vaccination.DTO;

import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@ToString
public class SlotBookingDTO {
    private Long id;
    private String username;
    private String phonenumber;
    private String aadhaarnumber;
    private String email;
    private String date;
    private String time;
    private String name;
    private Long availableSlots;
}
