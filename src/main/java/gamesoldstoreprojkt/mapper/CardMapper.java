package gamesoldstoreprojkt.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

import gamesoldstoreprojkt.Model.Card;
import gamesoldstoreprojkt.Model.DTOModels.CardDTO;

@Mapper
public interface CardMapper {
    CardMapper INSTANCE = Mappers.getMapper(CardMapper.class);

    Card toModel(CardDTO cardDTO);
    
    CardDTO toDTO(Card card);
}
