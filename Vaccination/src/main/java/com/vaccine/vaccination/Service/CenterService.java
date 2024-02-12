package com.vaccine.vaccination.Service;

import com.vaccine.vaccination.DTO.*;
import com.vaccine.vaccination.Message.LoginResponse;
import com.vaccine.vaccination.Message.RegisterResponse;
import com.vaccine.vaccination.Model.*;
import com.vaccine.vaccination.Repository.*;
import lombok.AllArgsConstructor;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.Period;
import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
public class CenterService {
    private final CenterRepository centerRepository;
    private final RegisterRepository registerRepository;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;
    private final TestRepository bookingRepository;
    private final BookAppointmentRepository bookAppointmentRepository;
    private final DateRepository dateRepository;
    private final TimeRepository timeRepository;
    private final SlotRepository slotRepository;
    public Centers postCenter(CenterDTO centerDTO) {
        Centers centers = new Centers(
                centerDTO.getId(),
                centerDTO.getImageUrl(),
                centerDTO.getName(),
                centerDTO.getLocation()
        );
        return centerRepository.save( centers );
    }

    public List<Centers> getCenter() {
        return centerRepository.findAll();
    }

    public RegisterResponse registerUser(RegisterDTO registerDTO) {

        Optional<Register> registration = registerRepository.findRegisterByEmail( registerDTO.getEmail() );
        System.out.println(registration.isEmpty());
        if(registration.isPresent()){
            return new RegisterResponse("User with the email already exists");

        }
        else {

            Register register = new Register(
                    registerDTO.getId(),
                    registerDTO.getName(),
                    registerDTO.getEmail(),
                    this.bCryptPasswordEncoder.encode( registerDTO.getPassword() )
            );
            registerRepository.save( register );
            return new RegisterResponse("Registered successfully");
        }
    }
    public Test bookAppointment(testDTO bookingDTO){
        LocalDate date = LocalDate.parse( bookingDTO.getDate() );
        LocalDate current = LocalDate.now();
        int age = Period.between( date,current ).getYears();

        System.out.println(age);
        Test booking = new Test(
                bookingDTO.getId(),
                bookingDTO.getName(),

                date,
                age

        );
        return bookingRepository.save( booking );
    }

    public LoginResponse loginUser(LoginDTO loginDTO) {
        Register user  = registerRepository.findByEmail(loginDTO.getEmail());
        if(user!=null) {
            String password = loginDTO.getPassword();
            String encodedpassword = user.getPassword();
            boolean isPasswordright = bCryptPasswordEncoder.matches( password,encodedpassword );
            if (isPasswordright) {
                Optional<Register> register = registerRepository.findRegisterByEmailAndPassword( loginDTO.getEmail(), encodedpassword );
                if (register.isPresent()) {
                    boolean match = loginDTO.getEmail().matches( "alamelumangaim.cse2021@citchennai.net" );
                    if (match) {
                        return new LoginResponse( "Success", true, loginDTO.getEmail(),"admin" );
                    }
                    else{
                        return new LoginResponse("Success",true, loginDTO.getEmail(), "user");
                    }


                }

                return new LoginResponse( "Failed", false,"","" );

            }
            else {
                return new LoginResponse("Password Mismatched",false,"","");
            }
        }
        else{
            return new LoginResponse("User not exists",false,"","");
        }
    }

    public BookAppointment book(BookAppointmentDTO bookAppointmentDTO,String name) {

//        String s1 = bookAppointmentDTO.getTime();
//        System.out.println(s1);
//        String time = s1.substring( 14,22 );
//        System.out.println(time);
        System.out.println( name );
        BookAppointment bookAppointment = new BookAppointment(
                    bookAppointmentDTO.getId(),
                    bookAppointmentDTO.getName(),
                    bookAppointmentDTO.getPhonenumber(),
                    bookAppointmentDTO.getDate(),
                    bookAppointmentDTO.getTime(),
                    name

            );

        return bookAppointmentRepository.save(bookAppointment);
    }
    public void test(BookAppointment bookAppointment){
        System.out.println((bookAppointmentRepository.condition( bookAppointment )));
    }


    public Centers getCenterById(Long id) {
        return centerRepository.findCenterById(id);

    }

    public List<BookAppointment> getHistory() {
        return bookAppointmentRepository.findAll();
    }


    public Centers updateCenter(CenterDTO centerDTO) {
        Centers centers = new Centers(
                centerDTO.getId(),
                centerDTO.getImageUrl(),
                centerDTO.getName(),
                centerDTO.getLocation()
        );
        return centerRepository.save( centers );
    }


    public Availabledates addDate(Availabledates availabledates) {
        return dateRepository.save(availabledates);
    }

    public List<Availabledates> getDates() {
        return dateRepository.findAll();
    }

    public TImeSlot addSlot(TImeSlot tImeSlot) {
        return timeRepository.save( tImeSlot );
    }

    public List<TImeSlot> getSlot() {
        return timeRepository.findAll();
    }


    public RegisterResponse bookSlot(String name, String date, String time, SlotBookingDTO slotBookingDTO) {


        SlotBooking slotBooking = new SlotBooking(

                slotBookingDTO.getId(),
                slotBookingDTO.getUsername(),
                slotBookingDTO.getPhonenumber(),
                slotBookingDTO.getAadhaarnumber(),
                slotBookingDTO.getEmail(),
                date,
                time,
                name,
                slotRepository.count()

        );
        if(slotRepository.count()>10) {
           return new RegisterResponse("Bookings were closed");
        }
        slotRepository.save( slotBooking );
        return new RegisterResponse("Saved your booking");
    }


    public List<SlotBooking> getSlots() {
        return slotRepository.findAll();
    }
}
