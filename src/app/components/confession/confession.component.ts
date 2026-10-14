import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SinService } from './selectedSins/sin-service';
import { examinationItems } from './examination-items';

@Component({
  selector: 'app-confession',
  templateUrl: './confession.component.html',
  styleUrls: ['./confession.component.css'],
})
export class ConfessionComponent {
  sins = examinationItems;
  selectedSins = [...this.sinService.getSelectedSins()];
  customSins = [...this.sinService.getCustomSins()];
  customText = '';
  editingIndex: number | null = null;
  customError = '';
  status = '';
  confirmClear = false;
  search = '';
  lastConfessionTime = this.sinService.getLastConfession().time;
  lastConfessionUnit = this.sinService.getLastConfession().unit || 'months';
  groups = [
    {
      title: 'Our relationship with God',
      ranges: [
        [0, 18],
        [124, 152],
      ],
    },
    {
      title: 'Respect for God’s name',
      ranges: [
        [18, 26],
        [152, 159],
      ],
    },
    {
      title: 'Keeping the Lord’s Day',
      ranges: [
        [26, 32],
        [159, 167],
      ],
    },
    {
      title: 'Family and responsibilities',
      ranges: [
        [32, 40],
        [167, 191],
      ],
    },
    {
      title: 'Respect for life and our neighbor',
      ranges: [
        [40, 63],
        [191, 229],
      ],
    },
    {
      title: 'Faithfulness and chastity',
      ranges: [
        [63, 90],
        [229, 239],
      ],
    },
    {
      title: 'Justice and generosity',
      ranges: [
        [90, 113],
        [239, 247],
      ],
    },
    {
      title: 'Truth and kindness in speech',
      ranges: [
        [113, 118],
        [247, 261],
      ],
    },
    {
      title: 'Purity of heart',
      ranges: [
        [118, 122],
        [261, 266],
      ],
    },
    {
      title: 'Gratitude and contentment',
      ranges: [
        [122, 124],
        [266, examinationItems.length],
      ],
    },
  ].map((group) => ({
    title: group.title,
    items: group.ranges.flatMap(([start, end]) =>
      examinationItems.slice(start, end),
    ),
  }));

  constructor(
    private router: Router,
    public sinService: SinService,
  ) {}

  filteredItems(items: string[]): string[] {
    return items.filter((item) =>
      item.toLowerCase().includes(this.search.trim().toLowerCase()),
    );
  }

  toggle(sin: string): void {
    this.selectedSins = this.selectedSins.includes(sin)
      ? this.selectedSins.filter((item) => item !== sin)
      : [...this.selectedSins, sin];
    this.sinService.setSelectedSins(this.selectedSins);
  }

  saveCustom(): void {
    const text = this.customText.trim();
    if (!text || text.length > 500) {
      this.customError =
        'Please enter a personal item between 1 and 500 characters.';
      return;
    }
    if (this.editingIndex === null) {
      this.customSins = [...this.customSins, text];
      this.status = 'Your personal item was added.';
    } else {
      this.customSins = this.customSins.map((item, i) =>
        i === this.editingIndex ? text : item,
      );
      this.status = 'Your personal item was updated.';
    }
    this.sinService.setCustomSins(this.customSins);
    this.cancelEdit();
  }

  editCustom(index: number): void {
    this.editingIndex = index;
    this.customText = this.customSins[index];
    this.customError = '';
  }

  cancelEdit(): void {
    this.editingIndex = null;
    this.customText = '';
    this.customError = '';
  }

  removeCustom(index: number): void {
    this.customSins = this.customSins.filter((_, i) => i !== index);
    this.sinService.setCustomSins(this.customSins);
    this.cancelEdit();
    this.status = 'Your personal item was removed.';
  }

  saveLastConfession(): void {
    this.sinService.setLastConfession(
      this.lastConfessionTime,
      this.lastConfessionUnit,
    );
  }

  clear(): void {
    this.sinService.clear();
    this.selectedSins = [];
    this.customSins = [];
    this.lastConfessionTime = 0;
    this.lastConfessionUnit = 'months';
    this.cancelEdit();
    this.status = '';
    this.confirmClear = false;
  }

  onSubmit(): void {
    this.saveLastConfession();
    this.router.navigate(['/selected-sins']);
  }
}
