import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { AlertController, ToastController } from '@ionic/angular';
import { addIcons } from 'ionicons';
import {
  addOutline,
  refreshOutline,
  saveOutline,
  trashOutline,
} from 'ionicons/icons';

const STORAGE_KEY = 'ficha-guerrilheiro-urbano';

@Component({
  selector: 'app-ficha',
  templateUrl: './ficha.page.html',
  styleUrls: ['./ficha.page.scss'],
  standalone: false,
})
export class FichaPage implements OnInit {
  fichaForm!: FormGroup;

  readonly atributosList = [
    { key: 'forca', label: 'Força' },
    { key: 'agilidade', label: 'Agilidade' },
    { key: 'resistencia', label: 'Resistência' },
    { key: 'inteligencia', label: 'Inteligência' },
    { key: 'percepcao', label: 'Percepção' },
    { key: 'carisma', label: 'Carisma' },
  ];

  constructor(
    private fb: FormBuilder,
    private toastCtrl: ToastController,
    private alertCtrl: AlertController,
  ) {
    addIcons({
      'save-outline': saveOutline,
      'refresh-outline': refreshOutline,
      'trash-outline': trashOutline,
      'add-outline': addOutline,
    });
  }

  ngOnInit(): void {
    this.criarFormulario();
    this.carregar();
  }

  get pericias(): FormArray {
    return this.fichaForm.get('pericias') as FormArray;
  }

  private criarFormulario(): void {
    this.fichaForm = this.fb.group({
      nome: [''],
      codinome: [''],
      idade: [null],
      origem: [''],
      ocupacao: [''],
      celula: [''],
      atributos: this.fb.group({
        forca: [1],
        agilidade: [1],
        resistencia: [1],
        inteligencia: [1],
        percepcao: [1],
        carisma: [1],
      }),
      status: this.fb.group({
        pv: [10],
        pvMax: [10],
        sanidade: [10],
        sanidadeMax: [10],
        iniciativa: [0],
        defesa: [10],
      }),
      pericias: this.fb.array([
        this.criarPericia('Combate', 0),
        this.criarPericia('Furtividade', 0),
        this.criarPericia('Tecnologia', 0),
        this.criarPericia('Sobrevivência', 0),
        this.criarPericia('Intimidação', 0),
        this.criarPericia('Investigação', 0),
      ]),
      equipamento: [''],
      anotacoes: [''],
    });
  }

  private criarPericia(nome = '', valor = 0): FormGroup {
    return this.fb.group({ nome: [nome], valor: [valor] });
  }

  adicionarPericia(): void {
    this.pericias.push(this.criarPericia());
  }

  removerPericia(index: number): void {
    this.pericias.removeAt(index);
  }

  salvar(): void {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(this.fichaForm.value));
    this.toast('Ficha salva com sucesso!');
  }

  private carregar(): void {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return;
    try {
      const data = JSON.parse(raw);
      const { pericias, ...resto } = data;
      this.fichaForm.patchValue(resto);
      if (Array.isArray(pericias)) {
        this.pericias.clear();
        pericias.forEach((p: { nome?: string; valor?: number }) =>
          this.pericias.push(this.criarPericia(p?.nome ?? '', p?.valor ?? 0)),
        );
      }
    } catch (err) {
      console.error('Falha ao carregar ficha', err);
    }
  }

  async limpar(): Promise<void> {
    const alert = await this.alertCtrl.create({
      header: 'Nova ficha',
      message: 'Isso vai apagar a ficha atual. Continuar?',
      buttons: [
        { text: 'Cancelar', role: 'cancel' },
        {
          text: 'Apagar',
          role: 'destructive',
          handler: () => {
            localStorage.removeItem(STORAGE_KEY);
            this.criarFormulario();
            this.toast('Nova ficha em branco criada.', 'medium');
          },
        },
      ],
    });
    await alert.present();
  }

  private async toast(message: string, color = 'success'): Promise<void> {
    const t = await this.toastCtrl.create({
      message,
      duration: 1500,
      color,
      position: 'bottom',
    });
    await t.present();
  }
}
