<?php
class Applicant {
    public $name;
    public $email;
    public $phone;
    public $resume;
    public $message;

    public function __construct($name, $email, $phone, $resume, $message) {
        $this->name = $name;
        $this->email = $email;
        $this->phone = $phone;
        $this->resume = $resume;
        $this->message = $message;
    }
}
?>