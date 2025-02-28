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
  searchQuery: string = ''; //I stole this search function from an AI.
  filteredFAQs: any[] = [];
  faqs: any[] = [
      { question: 'When was MAXX Energy founded?', answer: 'MAXX Energy was founded by Mack S. Energy in 1447 when he discovered how to make fire.' },
      { question: 'What region does MAXX Energy serve?', answer: 'Our power plants provide energy for Montgomery County and Prince George\'s County in Maryland; Arlington County and Alexandria in Virginia; and the DC area.' },
      { question: 'Is this company even real?', answer: 'No.' }
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
