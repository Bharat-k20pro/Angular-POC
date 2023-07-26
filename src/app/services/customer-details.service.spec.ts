import { TestBed } from '@angular/core/testing';

import { CustomerDetailsService } from './customer-details.service';
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";
import {RouterTestingModule} from "@angular/router/testing";
import {CustomerDetailsModel} from "../models/customer-details.model";

describe('CustomerDetailsService', () => {
  let service: CustomerDetailsService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule],
      providers: [CustomerDetailsService]
    });
    service = TestBed.inject(CustomerDetailsService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch customer details from the API', () => {
    // Arrange
    const idType = 'passport';
    const idCode = '9898989898';

    // Act
    service.getCustomerDetails(idType, idCode);

    // Assert
    const req = httpMock.expectOne(`${service.BASE_URL}/api/identifications?filter=(AND (EQ identification-id "${idCode}") (EQ identification-type "${idType}"))&include=party.contact-media,party.customer-accounts`);
    expect(req.request.method).toBe('GET');
    // Add more assertions for query parameters, headers, etc.

    // Simulate successful response
    const mockData = {
      // ... mock API response
    };
    req.flush(mockData);

    // Assert that customerData is updated and customerChanged event is emitted
    expect(service.customerData).toEqual(jasmine.any(CustomerDetailsModel));
    // Add more assertions for customerData properties

    // Assert that the customerChanged event is emitted with the updated customerData
    service.customerChanged.subscribe((data: CustomerDetailsModel) => {
      expect(data).toEqual(service.customerData);
    });
  });
});
