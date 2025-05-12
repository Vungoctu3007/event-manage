<?php

namespace Database\Seeders;

use App\Models\Category;
use App\Models\Event;
use App\Models\EventReview;
use App\Models\Order;
use App\Models\OrderItem;
use App\Models\Organizer;
use App\Models\Payment;
use App\Models\QRCode;
use App\Models\ScheduleEvent;
use App\Models\Seat;
use App\Models\SeatingMap;
use App\Models\Ticket;
use App\Models\TicketBooking;
use App\Models\User;
use App\Models\Venue;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
       
        // User::factory()->count(20)->create();
        // Category::factory()->count(5)->create();
        // Venue::factory()->count(5)->create();
        // Organizer::factory()->count(10)->create();

        // // Seed events (depends on Category, Venue, Organizer)
        // Event::factory()->count(15)->create();

        // // Seed tickets and seating maps (depends on Event, Venue)
        // Ticket::factory()->count(10)->create();
        // SeatingMap::factory()->count(10)->create();

        // // Seed seats (depends on Venue, Event)
        // Seat::factory()->count(100)->create();

        // // Seed orders (depends on User)
        // Order::factory()->count(20)->create();

        // // Seed order items (depends on Order, Ticket, Seat)
        // OrderItem::factory()->count(10)->create();

        // // Seed payments (depends on Order)
        // Payment::factory()->count(10)->create();

        // Seed event reviews (depends on User, Event)
        EventReview::factory()->count(10)->create();

        // Seed schedule events (depends on Event)
        ScheduleEvent::factory()->count(10)->create();

        // Seed user tickets (depends on User, Ticket)
        TicketBooking::factory()->count(10)->create();

        // Seed QR codes (depends on OrderItem)
        QRCode::factory()->count(10)->create();
    }
}
