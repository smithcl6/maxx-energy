import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-f-a-q',
  imports: [ FormsModule, CommonModule ],
  templateUrl: './f-a-q.component.html',
  styleUrl: './f-a-q.component.scss'
})
export class FAQComponent {
  searchQuery: string = ''; //I stole line 12-33 from a robot
  filteredFAQs: any[] = [];
  faqs: any[] = [
      { question: 'When was MAXX Energy founded?', answer: 'MAXX Energy was founded by John Maxxenergy in 1447 when he discovered how to make fire.' },
      { question: 'Question 2', answer: 'Answer 2' },
      // ... more FAQs
  ];

  ngOnInit() {
      this.filteredFAQs = [...this.faqs];
  }

  searchFAQ() {
      if (this.searchQuery) {
          this.filteredFAQs = this.faqs.filter(faq =>
              faq.question.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
              faq.answer.toLowerCase().includes(this.searchQuery.toLowerCase())
          );
      } else {
           this.filteredFAQs = [...this.faqs];
      }
  }
}
