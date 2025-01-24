import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  standalone: true,
  imports: [],
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  user: any = null;
  images: any[] = [];

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    this.authService.getUserInfo().subscribe(
      (data) => {
        this.user = data;
      },
      (error) => {
        console.error('Error fetching user info:', error);
        this.router.navigate(['/login']);
      }
    );

    this.loadImages();
  }

  loadImages() {
    this.authService.getImages().subscribe(
      (data: any) => {
        this.images = data;
      },
      (error) => {
        console.error('Error loading images:', error);
      }
    );
  }

  onLike(imageId: number) {
    this.authService.likeImage(imageId).subscribe(
      () => {
        console.log(`Image ${imageId} liked!`);
        this.loadImages();
      },
      (error) => {
        console.error('Error liking image:', error);
      }
    );
  }

  onDislike(imageId: number) {
    this.authService.dislikeImage(imageId).subscribe(
      () => {
        console.log(`Image ${imageId} disliked!`);
        this.loadImages();
      },
      (error) => {
        console.error('Error disliking image:', error);
      }
    );
  }
}
