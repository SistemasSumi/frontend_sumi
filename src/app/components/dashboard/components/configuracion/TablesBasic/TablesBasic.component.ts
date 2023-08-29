import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ModelFormasPago } from '../models/ModelFormasPago';
import { ModelImpuestos } from '../models/ModelImpuestos';
import { ModelRetenciones } from '../models/ModelRetenciones';
import { TablesBasicService } from './tablesBasic.service';

@Component({
  selector: 'app-TablesBasic',
  templateUrl: './TablesBasic.component.html',
  styleUrls: ['./TablesBasic.component.css']
})
export class TablesBasicComponent implements OnInit {

  formaSelecionada: ModelFormasPago = null;
  IMPSelecionada  : ModelImpuestos  = null;
  RTFSelecionada  : ModelImpuestos  = null;

  modalForma: NgbModalRef;
  modalIMP  : NgbModalRef;
  modalRFT  : NgbModalRef;


  ListFP : ModelFormasPago[] = [];
  ListIMP: ModelImpuestos[]  = [];
  ListRTF: ModelRetenciones[]  = [];


  constructor(private tablesService:TablesBasicService,private modalService: NgbModal) { }

  ngOnInit() {  
    this.getFormasDePago();
    this.getImpuestos();
    this.getRetenciones();
  }

  getFormasDePago(){
    this.tablesService.SubjectdataFP.subscribe((resp:ModelFormasPago[]) => {
      this.formaSelecionada = null;
      this.ListFP = resp;
    });
   

  }

  agregarForma(content) {
    this.formaSelecionada = null;
		this.modalForma = this.modalService.open(content, { centered: true });
	}

  EditarForma(content,forma:ModelFormasPago) {
    this.formaSelecionada = forma;

		this.modalForma = this.modalService.open(content, { centered: true });
	}

  closeModalForma(){
    this.formaSelecionada = null;
    this.modalForma.close();
  }

  ResultForma(value){
    // console.log(value);
    
    if(value){
      this.closeModalForma();
    }
  }


  getImpuestos(){
    this.tablesService.SubjectdataIMP.subscribe((resp:ModelImpuestos[]) => {
      this.IMPSelecionada = null;
      this.ListIMP        = resp;
    });
  }


  agregarIMP(content) {
    this.IMPSelecionada = null;
		this.modalIMP = this.modalService.open(content, { centered: true });
	}

  closeModalIMP(){
    this.IMPSelecionada = null;
    this.modalIMP.close();
  }


  getRetenciones(){
    this.tablesService.SubjectdataRTF.subscribe((resp:ModelRetenciones[]) => {
      this.RTFSelecionada = null;
      this.ListRTF        = resp;
    });
  }


  agregarRTF(content) {
    this.RTFSelecionada = null;
		this.modalRFT = this.modalService.open(content, { centered: true });
	}

  closeModaRTF(){
    this.RTFSelecionada = null;
    this.modalRFT.close();
  }

}
