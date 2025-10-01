<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class MailFunction extends Mailable
{
    use Queueable, SerializesModels;

    public $data; // Pass data to view

    public function __construct($data)
    {
        $this->data = $data;
    }

    public function build()
    {
        return $this->subject('Your Notification')
                    ->view('emails.mail-template');
    }
}
