import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  standalone: true,
  imports: [FormsModule],
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  user: any = null;
  images: any[] = [];
  showAddImageForm: boolean = false;
  newImageUrl: string = '';

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

  toggleAddImageForm() {
    this.showAddImageForm = !this.showAddImageForm;
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

  addImage() {
    if (!this.newImageUrl.trim()) return;

    this.authService.addImage(this.newImageUrl).subscribe(
      (response) => {
        console.log('Image added:', response);
        this.loadImages(); // Recharge la liste des images après l'ajout
        this.newImageUrl = '';
        this.showAddImageForm = false; // Cache le formulaire
      },
      (error) => {
        console.error('Error adding image:', error);
      }
    );
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append('file', file);

      this.authService.uploadImage(formData).subscribe(
        (response) => {
          console.log('Image uploaded:', response);
          this.loadImages(); // Recharge les images après le téléchargement
        },
        (error) => {
          console.error('Error uploading image:', error);
        }
      );
    }
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
