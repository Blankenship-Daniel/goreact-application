<?php

namespace Tests\Feature;

use App\User;
use App\Media;
use Illuminate\Foundation\Testing\DatabaseMigrations;
use Tests\TestCase;

class MediaTest extends TestCase
{
    use DatabaseMigrations;

    private $userId;

    public function setUp(): void 
    {
        parent::setUp();
        
        $user = new User([
            'name'     => 'test', 
            'email'    => 'test@email.com',
            'password' => '123456'
        ]);

        $user->save();
        $this->userId = $user->id;
    }

    /** @test */
    public function it_will_upload_media_for_a_given_user()
    {
        $response = $this->post("api/media/user/{$this->userId}", [
            'url' => 'test.com/media'
        ]);

        $response->assertJsonStructure([
            'user_id',
            'url',
            'updated_at',
            'created_at',
            'id'
        ]);
    }

    /** @test */
    public function it_will_return_all_media_for_a_given_user()
    {
        $media = new Media;
        $media->user_id = $this->userId;
        $media->url = 'http://test.com/new_media';
        $media->save();

        $media1 = new Media;
        $media1->user_id = $this->userId;
        $media1->url = 'http://test2.com/new_media';
        $media1->save();

        $response = $this->get("api/media/user/{$this->userId}");

        $response->assertJsonCount(2);
    }
}
